import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ObjectId, Collection, Document } from 'mongodb';
import { readFile } from 'fs';
import { promisify } from 'util';
import path from 'path';
import { jwtVerify } from 'jose';

import mongo from '../db/db';
import { Comment, Model } from '../db/models';
import { PUBLIC_KEY } from '../index';

export default class Service {
  constructor(public model: Model) {
    this.get = this.get.bind(this);
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.authorize = this.authorize.bind(this);
    this.loadUser = this.loadUser.bind(this);
    this.loadImage = this.loadImage.bind(this);
  }

  async get({ params: { id } }: Request, res: Response) {
    try {
      const collection = await this.model.collection();
      const item = await collection.findOne({ _id: new ObjectId(id) });
      if (item.image) await this.loadImage(item);
      if (item.user.image) await this.loadImage(item.user);
      if (item.comments?.some((comment: Comment) => comment.user.image))
        await Promise.all(
          item.comments
            ?.filter((comment: Comment) => comment.user.image)
            .map(async (comment: Comment) => this.loadImage(comment.user))
        );

      return res.status(StatusCodes.OK).send(item);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const collection = await this.model.collection();
      const items = await collection.find({}).toArray();
      await Promise.all(
        items
          .filter((item) => item.image)
          .map(async (item) => this.loadImage(item))
      );
      await Promise.all(
        items
          .filter((item) => item.user?.image)
          .map(async (item) => this.loadImage(item.user))
      );
      if (
        items.some((item) =>
          item.comments?.some((comment: Comment) => comment.user.image)
        )
      )
        await Promise.all(
          items
            .filter((item) =>
              item.comments?.some((comment: Comment) => comment.user.image)
            )
            .map(
              async (item) =>
                await Promise.all(
                  item.comments
                    .filter((comment: Comment) => comment.user.image)
                    .map((comment: Comment) => this.loadImage(comment.user))
                )
            )
        );

      return res.status(StatusCodes.OK).send(items);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  async insert({ body: data }: Request, res: Response) {
    try {
      const collection = await this.model.collection();
      const item = await collection.insertOne({
        ...data,
        user: await this.loadUser(res.locals.username),
      });

      return res.status(StatusCodes.CREATED).send(item);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  async update({ body: data }: Request, res: Response) {
    try {
      const collection = await this.model.collection();
      if (await this.authorize(collection, data._id, res)) {
        const { _id, ...rest } = data;
        const updated = await collection.updateOne(
          { _id: new ObjectId(data._id) },
          {
            $set: { ...rest },
          }
        );

        return res.status(StatusCodes.OK).send(updated);
      }

      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(ReasonPhrases.UNAUTHORIZED);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  }

  async delete({ params: { id } }: Request, res: Response) {
    try {
      const collection = await this.model.collection();
      if (await this.authorize(collection, id, res)) {
        const item = await collection.deleteOne({ _id: new ObjectId(id) });

        return res.status(StatusCodes.OK).send(item);
      }

      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(ReasonPhrases.UNAUTHORIZED);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  }

  async verifyToken(req: Request, res: Response, next: Function) {
    const cookies = req.headers.cookie.split(';').reduce((res, item) => {
      const data = item.trim().split('=');
      return { ...res, [data[0]]: data[1] };
    }, {});

    const jwt = cookies['jwt'];
    if (!jwt)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(ReasonPhrases.BAD_REQUEST);

    try {
      const { payload } = await jwtVerify(jwt, PUBLIC_KEY, {
        algorithms: ['ES256'],
        issuer: 'NJP',
        maxTokenAge: '1h',
      });
      res.locals.username = payload.username;

      return next();
    } catch (err) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(ReasonPhrases.UNAUTHORIZED);
    }
  }

  async authorize(collection: Collection<Document>, id: string, res: Response) {
    try {
      const item = await collection.findOne({ _id: new ObjectId(id) });
      if (!item)
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);

      return item.user.username == res.locals.username;
    } catch (err) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(ReasonPhrases.BAD_REQUEST);
    }
  }

  async loadUser(username: string) {
    const db = await mongo.db();
    const { _id, password, salt, ...rest } = await db
      .collection('users')
      .findOne({ username: username });

    return rest;
  }

  async loadImage(item: any) {
    item.image = await promisify(readFile)(
      path.join(__dirname, `../data/images/${item.image}`),
      { encoding: 'base64' }
    );

    return item;
  }
}

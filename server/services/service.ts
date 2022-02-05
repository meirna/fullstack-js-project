import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ObjectId, Collection, Document } from 'mongodb';
import { jwtVerify } from 'jose';

import mongo from '../db/db';
import { Model } from '../db/models';
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
  }

  async get({ params: { id } }: Request, res: Response) {
    try {
      const collection = await this.model.collection();
      const item = await collection.findOne({ _id: new ObjectId(id) });

      return res.status(StatusCodes.OK).send(item);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const collection = await this.model.collection();
      const items = await collection.find({}).toArray();

      return res.status(StatusCodes.OK).send(items);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
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
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
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

        return res.status(StatusCodes.OK).send({ insertedId: _id });
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
        maxTokenAge: '2h',
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
}

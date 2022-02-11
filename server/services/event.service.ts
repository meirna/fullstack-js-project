import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';

import mongo from '../db/db';
import { Event } from '../db/models';
import { loadUser } from './service';

export async function postComment(req: Request, res: Response) {
  const comment = {
    ...req.body,
    user: await loadUser(res.locals.username),
    eventId: new ObjectId(req.params.id),
    timestamp: new Date(),
  };

  try {
    const collection = await new Event().collection();
    const db = await mongo.db();
    const { insertedId } = await db.collection('comments').insertOne(comment);

    const inserted = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $push: { comments: { ...comment, _id: new ObjectId(insertedId) } },
      }
    );

    return res.status(StatusCodes.OK).send({ ...comment, _id: insertedId });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}

export async function get({ params: { id } }: Request, res: Response) {
  try {
    const collection = await new Event().collection();
    const item = await collection.findOne({ _id: new ObjectId(id) });

    return res.status(StatusCodes.OK).send(item);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}

export async function getAll(req: Request, res: Response) {
  try {
    const collection = await new Event().collection();
    const items = await collection.find({}).toArray();

    return res.status(StatusCodes.OK).send(items);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}

export async function insert({ body: data }: Request, res: Response) {
  try {
    const collection = await new Event().collection();
    const { insertedId } = await collection.insertOne({
      ...data,
      user: await loadUser(res.locals.username),
    });

    return res.status(StatusCodes.CREATED).send(insertedId);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}

export async function update({ body: data }: Request, res: Response) {
  try {
    const collection = await new Event().collection();
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

export async function remove({ params: { id } }: Request, res: Response) {
  try {
    const collection = await new Event().collection();
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

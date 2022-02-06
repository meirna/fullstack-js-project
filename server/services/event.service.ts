import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';

import mongo from '../db/db';
import { Event } from '../db/models';
import Service from './service';

class EventService extends Service {
  constructor(model: Event) {
    super(model);
    this.postComment = this.postComment.bind(this);
  }

  async postComment(req: Request, res: Response) {
    const comment = {
      ...req.body,
      user: await this.loadUser(res.locals.username),
      eventId: req.params.id,
      timestamp: new Date(),
    };

    try {
      const collection = await this.model.collection();
      const db = await mongo.db();
      const { insertedId } = await db.collection('comments').insertOne(comment);

      const updated = await collection.updateOne(
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
}

export default new EventService(new Event());

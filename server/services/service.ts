import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';

import { Model } from '../db/models';

export default class Service {
  constructor(public model: Model) {
    this.get = this.get.bind(this);
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async get({ params: { id } }: Request, res: Response) {
    try {
      const collection = await this.model.collection();
      const item = await collection.findOne({ _id: new ObjectId(id) });

      return res.status(StatusCodes.OK).send(item);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const collection = await this.model.collection();
      const items = await collection.find({}).toArray();

      return res.status(StatusCodes.OK).send(items);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  async insert({ body: data }: Request, res: Response) {
    try {
      const collection = await this.model.collection();
      const item = await collection.insertOne(data);

      return res.status(StatusCodes.CREATED).send(item);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  async update({ body: data }: Request, res: Response) {
    try {
      const collection = await this.model.collection();
      const item = await collection.updateOne(
        { _id: new ObjectId(data._id) },
        { $set: data }
      );

      return res.status(StatusCodes.OK).send(item);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  async delete({ params: { id } }: Request, res: Response) {
    try {
      const collection = await this.model.collection();
      const item = await collection.deleteOne({ _id: new ObjectId(id) });

      if (!item)
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);

      return res.status(StatusCodes.ACCEPTED).send();
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    }
  }
}

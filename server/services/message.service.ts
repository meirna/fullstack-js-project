import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Message } from '../db/models';
import { loadUser } from './service';

export async function getAll(req: Request, res: Response) {
  try {
    const collection = await new Message().collection();
    const items = await collection
      .aggregate([
        { $match: { 'user.username': res.locals.username } },
        { $group: { _id: '$recipient' } },
        { $project: { _id: 0, recipient: '$_id' } },
      ])
      .toArray();

    return res.status(StatusCodes.OK).send(items);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}

export async function get(req: Request, res: Response) {
  try {
    const collection = await new Message().collection();
    const items = await collection
      .find({
        'user.username': res.locals.username,
        'recipient.username': req.params.username,
      })
      .toArray();

    return res.status(StatusCodes.OK).send(items);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }

  return res;
}

export async function insert(req: Request, res: Response) {
  const message = {
    user: await loadUser(res.locals.username),
    recipient: await loadUser(req.params.username),
    text: req.body.text,
  };

  try {
    const collection = await new Message().collection();
    const { insertedId } = await collection.insertOne(message);

    return res.status(StatusCodes.CREATED).send(insertedId);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}

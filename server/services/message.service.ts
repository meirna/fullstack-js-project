import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Message, User } from '../db/models';
import { loadUser } from './service';

export async function getAll(req: Request, res: Response) {
  try {
    const collection = await new Message().collection();
    const items = await collection
      .aggregate([
        {
          $match: {
            $or: [
              { 'user.username': res.locals.username },
              { 'recipient.username': res.locals.username },
            ],
          },
        },
        {
          $group: {
            _id: { recipient: '$recipient', user: '$user' },
          },
        },
        {
          $project: {
            _id: 0,
            u1: {
              $cond: {
                if: { $ne: ['$_id.recipient.username', res.locals.username] },
                then: '$_id.recipient',
                else: '$$REMOVE',
              },
            },
            u2: {
              $cond: {
                if: { $ne: ['$_id.user.username', res.locals.username] },
                then: '$_id.user',
                else: '$$REMOVE',
              },
            },
          },
        },
      ])
      .toArray();

    const set = new Set();
    items.forEach((item) =>
      Object.values(item).forEach((value) => set.add(JSON.stringify(value)))
    );
    const messages: Message[] = [];
    set.forEach((u: any) => {
      const user = JSON.parse(u);
      messages.push(
        new Message(new User(user.username, undefined, undefined, user.image))
      );
    });

    return res.status(StatusCodes.OK).send(messages);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}

export async function get(req: Request, res: Response) {
  try {
    const collection = await new Message().collection();
    const items = await collection
      .find({
        $or: [
          {
            'user.username': res.locals.username,
            'recipient.username': req.params.username,
          },
          {
            'user.username': req.params.username,
            'recipient.username': res.locals.username,
          },
        ],
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

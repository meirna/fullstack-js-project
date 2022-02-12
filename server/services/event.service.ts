import { Request, Response } from 'express';
import { unlink, writeFile } from 'fs';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';

import mongo from '../db/db';
import { Event } from '../db/models';
import { authorize, loadUser } from './service';

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
    let event: Event = data as Event;
    if (event.image?.data) event = await saveImageFile(event);
    const collection = await new Event().collection();
    const { insertedId } = await collection.insertOne({
      ...(event as any),
      user: await loadUser(res.locals.username),
    });

    return res.status(StatusCodes.CREATED).send({ insertedId: insertedId });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}

export async function update({ body: data }: Request, res: Response) {
  try {
    const collection = await new Event().collection();
    if (await authorize(collection, data._id, res)) {
      let event: Event = data as Event;
      if (event.image?.data) event = await saveImageFile(event);
      const { _id, ...rest } = event;
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
    if (await authorize(collection, id, res)) {
      const item = await collection.findOne({
        $and: [{ _id: new ObjectId(id) }, { image: { $exists: true } }],
      });
      if (item) await deleteImageFile(item);
      const deleted = await collection.deleteOne({ _id: new ObjectId(id) });
      const db = await mongo.db();
      await db.collection('comments').deleteMany({ eventId: new ObjectId(id) });
      return res.status(StatusCodes.OK).send(deleted);
    }

    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(ReasonPhrases.UNAUTHORIZED);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}

function saveImageFile(event: Event): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const matches = event.image.data.match(
      /^data:([A-Za-z-+\/]+);base64,(.+)$/
    );

    writeFile(
      `./${process.env.IMAGES_URL}/${event.image.name}`,
      matches[2],
      'base64',
      (err) => {
        if (err) return reject();
        resolve({ ...event, image: { name: event.image.name } });
      }
    );
  });
}

function deleteImageFile(event: any): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    unlink(`./${process.env.IMAGES_URL}/${event.image.name}`, (err) => {
      if (err) return reject();
      resolve();
    });
  });
}

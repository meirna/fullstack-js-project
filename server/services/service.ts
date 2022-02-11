import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ObjectId, Collection, Document } from 'mongodb';
import { jwtVerify } from 'jose';

import mongo from '../db/db';
import { PUBLIC_KEY } from '../index';

export async function verifyToken(req: Request, res: Response, next: Function) {
  const cookies = req.headers.cookie?.split(';').reduce((res, item) => {
    const data = item.trim().split('=');
    return { ...res, [data[0]]: data[1] };
  }, {});

  try {
    const jwt = cookies['jwt'];
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

export async function authorize(
  collection: Collection<Document>,
  id: string,
  res: Response
) {
  try {
    const item = await collection.findOne({ _id: new ObjectId(id) });
    if (!item)
      return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);

    return item.user.username == res.locals.username;
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }
}

export async function loadUser(username: string) {
  const db = await mongo.db();
  const { _id, password, salt, ...rest } = await db
    .collection('users')
    .findOne({ username: username });

  return rest;
}

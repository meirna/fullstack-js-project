import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { SignJWT } from 'jose';

import { User } from '../db/models';
import { PRIVATE_KEY } from '../index';

export async function login(
  { body: { username, password } }: Request,
  res: Response
) {
  const collection = await new User().collection();
  const existingUser = await collection.findOne({ username: username });
  if (!existingUser)
    return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);

  const passwordHash = hashPassword(password, existingUser.salt);
  if (passwordHash != existingUser.password)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(ReasonPhrases.UNAUTHORIZED);

  return res
    .cookie('jwt', await generateJWT(username), { httpOnly: true, path: '/' })
    .status(StatusCodes.OK)
    .send({ username: username });
}

export async function logout(req: Request, res: Response) {
  return res
    .clearCookie('jwt', { httpOnly: true, path: '/' })
    .status(StatusCodes.OK)
    .send();
}

export async function register({ body }: Request, res: Response) {
  const { username, password, email, name } = body;

  const collection = await new User().collection();
  const existingUser = await collection.findOne({ username: username });
  if (existingUser)
    return res.status(StatusCodes.CONFLICT).send(ReasonPhrases.CONFLICT);

  try {
    const salt = randomBytes(128).toString('base64');
    const createdUser = await collection.insertOne({
      ...body,
      password: hashPassword(password, salt),
      salt: salt,
    });
    return res.status(StatusCodes.CREATED).send();
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}

function hashPassword(password: string, salt: string) {
  const ITERATIONS = 10000;
  const BYTE_LENGTH = 64;
  const HASH_ALGORITHM = 'sha256';

  return pbkdf2Sync(
    password,
    salt,
    ITERATIONS,
    BYTE_LENGTH,
    HASH_ALGORITHM
  ).toString('base64');
}

async function generateJWT(username: string) {
  const jwt = await new SignJWT({
    username: username,
  })
    .setProtectedHeader({ alg: 'ES256' })
    .setIssuer('NJP')
    .setIssuedAt(Math.round(Date.now() / 1000))
    .setExpirationTime('6h')
    .sign(PRIVATE_KEY);

  return jwt;
}

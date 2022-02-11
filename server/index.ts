import { createPrivateKey, createPublicKey } from 'crypto';
import { readFileSync } from 'fs';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import { Server } from 'http';
import path from 'path';

import mongo from './db/db';
import eventController from './controllers/event.controller';
import userController from './controllers/user.controller';
import messageController from './controllers/message.controller';

export const PUBLIC_KEY = createPublicKey({
  key: readFileSync('./public.pem').toString(),
});
export const PRIVATE_KEY = createPrivateKey({
  key: readFileSync('./private.pem').toString(),
});

let app: Server;

const server = express()
  .use(compression())
  .use(express.json())
  // TODO: remove after prod build
  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'POST, GET, PUT, DELETE, OPTIONS'
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  })
  // .use(helmet())
  /*.use(express.static(path.join(__dirname, '../frontend/dist'))) */
  .use('/assets', express.static(path.join(__dirname, './assets/images')))
  .use('/api/events', eventController)
  .use('/api/messages', messageController)
  .use('/api/users', userController);

mongo
  .db()
  .then(() => {
    app = server.listen(process.env.PORT, () =>
      console.log(`Listening on port ${process.env.PORT}`)
    );
  })
  .catch(() => console.log('Database connection unavailable.'));

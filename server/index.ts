import express from 'express';
import helmet from 'helmet';
import { Server } from 'http';

import mongo from './db/db';
import eventController from './controllers/event.controller';
import userController from './controllers/user.controller';
import messageController from './controllers/message.controller';
import commentController from './controllers/comment.controller';

let app: Server;

const server = express()
  .use(express.json())
  .use(helmet())
  /*.use(express.static(path.join(__dirname, '../frontend/dist'))) */
  .use('/api/events', eventController.router)
  .use('/api/comments', commentController.router)
  .use('/api/messages', messageController.router)
  .use('/api/users', userController.router);

mongo
  .db()
  .then(() => {
    app = server.listen(process.env.PORT, () =>
      console.log(`Listening on port ${process.env.PORT}`)
    );
  })
  .catch(() => console.log('Database connection unavailable.'));

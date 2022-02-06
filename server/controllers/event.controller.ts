import { Router } from 'express';

import {
  get,
  getAll,
  insert,
  postComment,
  remove,
  update,
} from '../services/event.service';
import { verifyToken } from '../services/service';

export default Router()
  .get('/', getAll)
  .post('/', verifyToken, insert)
  .put(`/`, verifyToken, update)
  .get(`/:id`, get)
  .post(`/:id/comment`, verifyToken, postComment)
  .delete(`/:id`, verifyToken, remove);

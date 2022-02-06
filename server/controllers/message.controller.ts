import { Router } from 'express';

import { getAll, get, insert } from '../services/message.service';
import { verifyToken } from '../services/service';

export default Router()
  .get('/', verifyToken, getAll)
  .get('/:username', verifyToken, get)
  .post('/:username', verifyToken, insert);

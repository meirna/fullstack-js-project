import { Router } from 'express';

import { login, logout, register } from '../services/user.service';

export default Router()
  .post('/login', login)
  .post('/logout', logout)
  .post('/register', register);

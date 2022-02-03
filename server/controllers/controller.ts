import { Router } from 'express';

import Service from '../services/service';

export default class Controller {
  constructor(
    public service: Service,
    public router = Router()
      .get('/', service.getAll)
      .post('/', service.verifyToken, service.insert)
      .put(`/`, service.verifyToken, service.update)
      .get(`/:id`, service.get)
      .delete(`/:id`, service.verifyToken, service.delete)
  ) {}
}

import { Router } from 'express';
import Service from '../services/service';

export default class Controller {
  constructor(
    public service: Service,
    public router = Router()
      .get('/', service.getAll)
      .post('/', service.insert)
      .get(`/:id`, service.get)
      .put(`/:id`, service.update)
      .delete(`/:id`, service.delete)
  ) {}
}

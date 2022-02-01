import { Event } from '../db/models';
import Service from './service';

class EventService extends Service {
  constructor(model: Event) {
    super(model);
  }
}

export default new EventService(new Event());

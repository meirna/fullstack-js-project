import Controller from './controller';
import EventService from '../services/event.service';

class EventController extends Controller {
  constructor(service: any) {
    super(service);
  }
}

export default new EventController(EventService);

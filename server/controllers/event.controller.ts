import Controller from './controller';
import EventService from '../services/event.service';

class EventController extends Controller {
  constructor(service: any) {
    super(service);
    this.router.post('/:id/comment', service.verifyToken, service.postComment);
  }
}

export default new EventController(EventService);

import Controller from './controller';
import MessageService from '../services/message.service';

class MessageController extends Controller {
  constructor(service) {
    super(service);
  }
}

export default new MessageController(MessageService);

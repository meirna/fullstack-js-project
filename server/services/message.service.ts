import { Message } from '../db/models';
import Service from './service';

class MessageService extends Service {
  constructor(model: Message) {
    super(model);
  }
}

export default new MessageService(new Message());

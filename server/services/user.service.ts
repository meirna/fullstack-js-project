import { User } from '../db/models';
import Service from './service';

class UserService extends Service {
  constructor(model: User) {
    super(model);
  }
}

export default new UserService(new User());

import Controller from './controller';
import UserService from '../services/user.service';

class UserController extends Controller {
  constructor(service: any) {
    super(service);
  }
}

export default new UserController(UserService);

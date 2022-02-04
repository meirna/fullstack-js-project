import Controller from './controller';
import UserService from '../services/user.service';

class UserController extends Controller {
  constructor(service: any) {
    super(service);
    this.router
      .post('/login', service.login)
      .post('/logout', service.logout)
      .post('/register', service.register);
  }
}

export default new UserController(UserService);

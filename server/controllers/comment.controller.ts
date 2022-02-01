import Controller from './controller';
import CommentService from '../services/comment.service';

class CommentController extends Controller {
  constructor(service) {
    super(service);
  }
}

export default new CommentController(CommentService);

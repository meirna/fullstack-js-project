import { Comment } from '../db/models';
import Service from './service';

class CommentService extends Service {
  constructor(model: Comment) {
    super(model);
  }
}

export default new CommentService(new Comment());

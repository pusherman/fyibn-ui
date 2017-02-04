import { Injectable } from '@angular/core';
import { normalize, schema } from 'normalizr';

import { ApiService } from '../api/api.service';
import { Comment } from './comment.reducers';

@Injectable()
export class CommentService {
  private endpoint = 'comments';

  constructor(private api: ApiService) { }

  create(comment: Comment) {
    return this.api.post(this.endpoint, comment)
      .map(res => res);
  }
}

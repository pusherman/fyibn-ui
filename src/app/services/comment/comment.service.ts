import { Injectable } from '@angular/core';

import { ApiService } from '../api/api.service';

@Injectable()
export class CommentService {
  private endpoint = 'comments';

  constructor(private api: ApiService) { }

  create(comment: Comment) {
    return this.api.post(this.endpoint, comment)
      .map(res => res);
  }
}

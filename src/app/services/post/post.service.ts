import { Injectable } from '@angular/core';
import { normalize, schema } from 'normalizr';

import { ApiService } from '../api/api.service';



@Injectable()
export class PostService {
  private endpoint = 'posts';

  constructor(private api: ApiService) { }

  getPost(id: number) {
    return this.api.get(`${this.endpoint}/${id}`).map(res => res);
  }

  getPosts() {
    const user = new schema.Entity('users');

    const comment = new schema.Entity('comments', {
      commenter: user
    });

    const post = new schema.Entity('posts', {
      user: new schema.Entity('users'),
      comments: [ comment ]
    });

    const posts = [ post ];

    return this.api.get(this.endpoint)
      .map(res => {
        const response = normalize(res.posts.data, posts);

        response.entities['byPage'] = {};
        response.entities['byPage'][res.posts.current_page] = response.result;

        return response;
      });
  }
}

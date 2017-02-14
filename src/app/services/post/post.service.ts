import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { normalize } from 'normalizr';

import { ApiService } from '../api/api.service';
import { Post, Posts } from './post.reducers';
import { postsSchema, postSchema } from './post.schema';

@Injectable()
export class PostService {
  private endpoint = 'posts';

  constructor(private api: ApiService) { }

  getPost(id: number): Observable<Post> {
    const url = `${this.endpoint}/${id}`;

    return this.api.get(url)
      .map(res => normalize(res, postSchema));
  }

  getPosts(page = 1): Observable<Posts> {
    const url = `${this.endpoint}?page=${page}`;

    return this.api.get(url)
      .map(res => {
        const response = normalize(res.posts.data, postsSchema);

        response.entities['byPage'] = {};
        response.entities['byPage'][res.posts.current_page] = response.result;

        response.entities['pagination'] = {
          currentPage: res.posts.current_page,
          lastPage: res.posts.last_page,
          perPage: res.posts.per_page,
          totalItems: res.posts.total,
        };

        return response;
      });
  }
}

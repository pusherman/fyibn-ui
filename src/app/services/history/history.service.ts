import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../api/api.service';
import { PostHistory } from './history.reducers';

@Injectable()
export class HistoryService {

  private endpoint = 'history';

  constructor(private api: ApiService) { }

  create(post_id: number): Observable<PostHistory> {
    return this.api.post(this.endpoint, { post_id })
      .map(res => res);
  }

  remove(post_id: number): Observable<PostHistory> {
    return this.api.delete(this.endpoint, { post_id })
      .map(res => res);
  }
}

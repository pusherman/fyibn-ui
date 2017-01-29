import { Injectable } from '@angular/core';

import { ApiService } from '../api/api.service';

@Injectable()
export class PostService {
  private endpoint = 'posts';

  constructor(private api: ApiService) { }

  getLatest() {
    return this.api.get(this.endpoint);
  }
}

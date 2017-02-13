import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../api/api.service';
import { User, Users } from './user.reducers';

@Injectable()
export class UserService {
  private endpoint = 'users';

  constructor(private api: ApiService) { }

  getMe(): Observable<User> {
    const url = `${this.endpoint}/me`;

    return this.api.get(url)
      .map(res => res);
  }
}

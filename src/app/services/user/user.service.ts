import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { normalize } from 'normalizr';

import { ApiService } from '../api/api.service';
import { User, Users } from './user.reducers';
import { userSchema } from './user.schema';

@Injectable()
export class UserService {
  private endpoint = 'users';

  constructor(private api: ApiService) { }

  getMe(): Observable<User> {
    const url = `${this.endpoint}/me`;

    return this.api.get(url)
      .map(res => res);
  }

  getUser(id: number): Observable<User> {
    const url = `${this.endpoint}/${id}`;

    return this.api.get(url)
      .map(res => normalize(res, userSchema));
  }
}

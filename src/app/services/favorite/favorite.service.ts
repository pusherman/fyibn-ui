import { Injectable } from '@angular/core';
import { normalize, schema } from 'normalizr';

import { ApiService } from '../api/api.service';
import { Favorite } from './favorite.reducers';

@Injectable()
export class FavoriteService {
  private endpoint = 'favorites';

  constructor(private api: ApiService) { }

  create(favorite: Favorite) {
    return this.api.post(this.endpoint, favorite)
      .map(res => res);
  }
}

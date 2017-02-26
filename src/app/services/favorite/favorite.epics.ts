import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActionsObservable } from 'redux-observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { FavoriteActions } from './favorite.actions';
import { FavoriteService } from './favorite.service';

@Injectable()
export class FavoriteEpics {
  constructor(
    private router: Router,
    private favorites: FavoriteService,
  ) {}

  create = (action$: ActionsObservable<any>) => {
    return action$.ofType(FavoriteActions.CREATE_FAVORITE_REQUESTED)
      .switchMap(action => {
        return this.favorites.create(action.payload)
          .map(results => {
            return {
              type: FavoriteActions.CREATE_FAVORITE_SUCCESSFUL,
              payload: results,
            };
          })
          .catch(error => Observable.of({
            type: FavoriteActions.CREATE_FAVORITE_FAILED,
            payload: error,
          }));
        });
  }

  remove = (action$: ActionsObservable<any>) => {
    return action$.ofType(FavoriteActions.REMOVE_FAVORITE_REQUESTED)
      .switchMap(action => {
        return this.favorites.remove(action.payload)
          .map(results => {
            return {
              type: FavoriteActions.REMOVE_FAVORITE_SUCCESSFUL,
              payload: results,
            };
          })
          .catch(error => Observable.of({
            type: FavoriteActions.REMOVE_FAVORITE_FAILED,
            payload: error,
          }));
        });
  }
}

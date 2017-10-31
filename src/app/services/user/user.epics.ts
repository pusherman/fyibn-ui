import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { UserActions } from './user.actions';
import { UserService } from './user.service';

@Injectable()
export class UserEpics {
  constructor(
    private router: Router,
    private users: UserService,
  ) {}

  getMe = (action$: ActionsObservable<any>) => {
    return action$.ofType(UserActions.FETCH_ME_REQUESTED)
      .switchMap(action => {
        return this.users.getMe()
          .map(user => {
            return {
              type: UserActions.FETCH_ME_SUCCESSFUL,
              payload: user,
            };
          })
          .catch(error => Observable.of({
            type: UserActions.FETCH_ME_FAILED,
            payload: error,
          }));
        });
  }

  getUser = (action$: ActionsObservable<any>) => {
    return action$.ofType(UserActions.FETCH_USER_REQUESTED)
      .mergeMap(action => {
        console.log(action);
        return this.users.getUser(action.payload.userId)
          .map(user => {
            return {
              type: UserActions.FETCH_USER_SUCCESSFUL,
              payload: user,
            };
          })
          .catch(error => Observable.of({
            type: UserActions.FETCH_USER_FAILED,
            payload: error,
          }));
        });
  }
}

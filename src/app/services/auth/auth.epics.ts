import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { IAction } from '../../../store';

import { UserActions } from '../user/user.actions';

import { AuthActions } from './auth.actions';
import { AuthService } from './auth.service';

@Injectable()
export class AuthEpics {
  constructor(private auth: AuthService) {}

  login = (action$: ActionsObservable<IAction>) => {
    const authSuccessful = payload => ({ type: AuthActions.AUTH_SUCCESSFUL, payload });
    const fetchMe = () => ({ type: UserActions.FETCH_ME_REQUESTED });

    return action$.ofType(AuthActions.AUTH_REQUESTED)
      .switchMap(action => {
        const { username, password } = action.payload;
        return this.auth.login(username, password)
          .flatMap(payload => Observable.of(
            authSuccessful(payload),
            fetchMe(),
          ))
          .catch(payload => Observable.of({
            type: AuthActions.AUTH_FAILED,
            payload,
          }));
        });
  }

}

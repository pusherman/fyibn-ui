import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Router } from '@angular/router';

import { IAppState } from '../../../store';


@Injectable()
export class AuthActions {
  static AUTH_REQUESTED = 'AUTH_REQUESTED';
  static AUTH_SUCCESSFUL = 'AUTH_SUCCESSFUL';
  static AUTH_FAILED = 'AUTH_FAILED';
  static AUTH_ENDED = 'AUTH_ENDED';
  static REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';

  constructor(
     private ngRedux: NgRedux<IAppState>,
     private router: Router,
  ) {}

  login(username: string, password: string): void {
    this.ngRedux.dispatch({
      type: AuthActions.AUTH_REQUESTED,
      payload: {
        username,
        password,
      },
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);

    // give the components enough time to unsubscribe from
    // anything being watched before we clear the store
    setTimeout(() => {
      this.ngRedux.dispatch({ type: AuthActions.AUTH_ENDED });
    }, 500);
  }
}

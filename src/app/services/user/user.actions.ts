import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../store';

@Injectable()
export class UserActions {
  static FETCH_ME_REQUESTED = 'FETCH_ME_REQUESTED';
  static FETCH_ME_SUCCESSFUL = 'FETCH_ME_SUCCESSFUL';
  static FETCH_ME_FAILED = 'FETCH_ME_FAILED';

  static FETCH_USER_REQUESTED = 'FETCH_USER_REQUESTED';
  static FETCH_USER_SUCCESSFUL = 'FETCH_USER_SUCCESSFUL';
  static FETCH_USER_FAILED = 'FETCH_USER_FAILED';

  constructor(private ngRedux: NgRedux<IAppState>) {}

  getMe(): void {
    this.ngRedux.dispatch({
      type: UserActions.FETCH_ME_REQUESTED,
    });
  }

  getUser(userId: number): void {
    this.ngRedux.dispatch({
      type: UserActions.FETCH_USER_REQUESTED,
      payload: {
        userId,
      }
    });
  }
}

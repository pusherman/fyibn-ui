import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store';

@Injectable()
export class FavoriteActions {
  static CREATE_FAVORITE_REQUESTED = 'CREATE_FAVORITE_REQUESTED';
  static CREATE_FAVORITE_SUCCESSFUL = 'CREATE_FAVORITE_SUCCESSFUL';
  static CREATE_FAVORITE_FAILED = 'CREATE_FAVORITE_FAILED';

  static REMOVE_FAVORITE_REQUESTED = 'REMOVE_FAVORITE_REQUESTED';
  static REMOVE_FAVORITE_SUCCESSFUL = 'REMOVE_FAVORITE_SUCCESSFUL';
  static REMOVE_FAVORITE_FAILED = 'REMOVE_FAVORITE_FAILED';

  constructor(private ngRedux: NgRedux<IAppState>) {}

  create({ post_id }): void {
    this.ngRedux.dispatch({
      type: FavoriteActions.CREATE_FAVORITE_REQUESTED,
      payload: post_id,
    });
  }

  remove({ post_id }): void {
    this.ngRedux.dispatch({
      type: FavoriteActions.REMOVE_FAVORITE_REQUESTED,
      payload: post_id,
    });
  }
}

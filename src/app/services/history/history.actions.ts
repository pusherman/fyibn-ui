import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store';

@Injectable()
export class HistoryActions {
  static CREATE_HISTORY_REQUESTED = 'CREATE_HISTORY_REQUESTED';
  static CREATE_HISTORY_SUCCESSFUL = 'CREATE_HISTORY_SUCCESSFUL';
  static CREATE_HISTORY_FAILED = 'CREATE_HISTORY_FAILED';

  static REMOVE_HISTORY_REQUESTED = 'REMOVE_HISTORY_REQUESTED';
  static REMOVE_HISTORY_SUCCESSFUL = 'REMOVE_HISTORY_SUCCESSFUL';
  static REMOVE_HISTORY_FAILED = 'REMOVE_HISTORY_FAILED';

  constructor(private ngRedux: NgRedux<IAppState>) {}

  create({ post_id }): void {
    this.ngRedux.dispatch({
      type: HistoryActions.CREATE_HISTORY_REQUESTED,
      payload: post_id,
    });
  }

  remove({ post_id }): void {
    this.ngRedux.dispatch({
      type: HistoryActions.REMOVE_HISTORY_REQUESTED,
      payload: post_id,
    });
  }
}

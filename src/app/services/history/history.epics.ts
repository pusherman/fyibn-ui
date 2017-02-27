import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActionsObservable } from 'redux-observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { HistoryActions } from './history.actions';
import { HistoryService } from './history.service';

@Injectable()
export class HistoryEpics {
  constructor(
    private router: Router,
    private history: HistoryService,
  ) {}

  create = (action$: ActionsObservable<any>) => {
    return action$.ofType(HistoryActions.CREATE_HISTORY_REQUESTED)
      .switchMap(action => {
        return this.history.create(action.payload)
          .map(results => {
            return {
              type: HistoryActions.CREATE_HISTORY_SUCCESSFUL,
              payload: results,
            };
          })
          .catch(error => Observable.of({
            type: HistoryActions.CREATE_HISTORY_FAILED,
            payload: error,
          }));
        });
  }

  remove = (action$: ActionsObservable<any>) => {
    return action$.ofType(HistoryActions.REMOVE_HISTORY_REQUESTED)
      .switchMap(action => {
        return this.history.remove(action.payload)
          .map(results => {
            return {
              type: HistoryActions.REMOVE_HISTORY_SUCCESSFUL,
              payload: results,
            };
          })
          .catch(error => Observable.of({
            type: HistoryActions.REMOVE_HISTORY_FAILED,
            payload: error,
          }));
        });
  }
}

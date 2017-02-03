import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActionsObservable } from 'redux-observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { CommentActions } from './comment.actions';
import { CommentService } from './comment.service';

@Injectable()
export class CommentEpics {
  constructor(
    private router: Router,
    private comments: CommentService,
  ) {}

  create = (action$: ActionsObservable<any>) => {
    return action$.ofType(CommentActions.CREATE_COMMENT_REQUESTED)
      .switchMap(action => {
        return this.comments.create(action.payload)
          .map(results => {
            return {
              type: CommentActions.CREATE_COMMENT_SUCCESSFUL,
              payload: results,
            };
          })
          .catch(error => Observable.of({
            type: CommentActions.CREATE_COMMENT_FAILED,
            payload: error,
          }));
        });
  }
}

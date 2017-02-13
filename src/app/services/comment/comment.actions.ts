import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store';
import { Comment } from './comment.reducers';

@Injectable()
export class CommentActions {
  static CREATE_COMMENT_REQUESTED = 'CREATE_COMMENT_REQUESTED';
  static CREATE_COMMENT_SUCCESSFUL = 'CREATE_COMMENT_SUCCESSFUL';
  static CREATE_COMMENT_FAILED = 'CREATE_COMMENT_FAILED';

  constructor(private ngRedux: NgRedux<IAppState>) {}

  create(comment: Comment): void {
    this.ngRedux.dispatch({
      type: CommentActions.CREATE_COMMENT_REQUESTED,
      payload: comment,
    });
  }
}

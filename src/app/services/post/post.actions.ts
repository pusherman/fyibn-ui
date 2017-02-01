import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store';

@Injectable()
export class PostActions {
  static FETCH_POSTS_REQUESTED = 'FETCH_POSTS_REQUESTED';
  static FETCH_POSTS_SUCCESSFUL = 'FETCH_POSTS_SUCCESSFUL';
  static FETCH_POSTS_FAILED = 'FETCH_POSTS_FAILED';

  constructor(private ngRedux: NgRedux<IAppState>) {}

  getPosts(): void {
    this.ngRedux.dispatch({
      type: PostActions.FETCH_POSTS_REQUESTED,
    });
  }
}

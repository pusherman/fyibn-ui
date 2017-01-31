export interface IAction {
  readonly type: string;
  readonly payload?: any;
}

import { combineReducers } from 'redux';
import { AuthActions } from '../app/services/auth/auth.actions';

import { authReducer, IAuth } from '../app/services/auth/auth.reducers';
import { postReducer, Posts } from '../app/services/post/post.reducers';

export interface IAppState {
  auth: IAuth;
  posts: Posts;
};

const appReducer = combineReducers<IAppState>({
  auth: authReducer,
  posts: postReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === AuthActions.AUTH_ENDED ||
      action.payload === AuthActions.REFRESH_TOKEN_FAILED) {
    state = undefined;
    localStorage.clear();
  }

  return appReducer(state, action);
};
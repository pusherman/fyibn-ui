export interface IAction {
  readonly type: string;
  readonly payload?: any;
}

import { combineReducers } from 'redux';
import { AuthActions } from '../app/services/auth/auth.actions';

import { authReducer, IAuth } from '../app/services/auth/auth.reducers';
import { postReducer, Posts } from '../app/services/post/post.reducers';
import { userReducer, Users } from '../app/services/user/user.reducers';

export interface IAppState {
  auth: IAuth;
  posts: Posts;
  users: Users;
};

const appReducer = combineReducers<IAppState>({
  auth: authReducer,
  posts: postReducer,
  users: userReducer,
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};

import { combineReducers } from 'redux';
import { AuthActions } from '../app/services/auth/auth.actions';

import { authReducer, IAuth } from '../app/services/auth/auth.reducers';
import { postReducer, Posts } from '../app/services/post/post.reducers';

export interface IAction {
  readonly type: string;
  readonly payload?: any;
}

export interface IAppState {
  auth: IAuth;
  posts: Posts;
};

const appReducer = combineReducers<IAppState>({
  auth: authReducer,
  posts: postReducer,
});

export const rootReducer = (state, action) => {
  const endSession = () => {
    state = undefined;
    localStorage.clear();
  };

  if (action.type === AuthActions.AUTH_ENDED) {
    endSession();
  }

  // this is really dirty but it's the only way i could think
  // of to handle a failure of any action type.. should probably
  // be cleaned up so that the refresh tokens are handled by
  // actual actions rather than a service in the epics
  if (action.payload === AuthActions.REFRESH_TOKEN_FAILED) {
    endSession(); // also may need to redirect to login page
  }

  return appReducer(state, action);
};

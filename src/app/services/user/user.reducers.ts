import { IAction } from '../../../store';
import { PostActions } from '../post/post.actions';
import { AuthActions } from '../auth/auth.actions';
import { UserActions } from './user.actions';

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface Users {
  byId: {number?: User};
  authId: number;
  isFetching: boolean;
  error: boolean;
}

const INITIAL_STATE: Users = {
  byId: {},
  authId: 0,
  isFetching: false,
  error: false,
};

export function userReducer(
    state: Users = INITIAL_STATE,
    action: IAction,
  ): Users {

  switch (action.type) {
    case UserActions.FETCH_ME_REQUESTED:
      return Object.assign({}, state, {
        isFetching: true,
        authId: 0,
        error: false,
      });

    case UserActions.FETCH_ME_SUCCESSFUL:
      localStorage.setItem('me', action.payload.id);
      return Object.assign({}, state, {
        byId: Object.assign({}, state.byId, {[action.payload.id]: action.payload}),
        authId: action.payload.id,
        isFetching: false,
        error: false,
      });

    case UserActions.FETCH_ME_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        authId: 0,
        error: action.payload,
      });

    case PostActions.FETCH_POSTS_SUCCESSFUL:
      return Object.assign({}, state, {
        byId: Object.assign({}, state.byId, action.payload.entities.users),
      });

    case PostActions.FETCH_POST_SUCCESSFUL:
      return Object.assign({}, state, {
        byId: Object.assign({}, state.byId, action.payload.entities.users),
      });

    case AuthActions.AUTH_ENDED:
      return Object.assign({}, state, INITIAL_STATE);

    default:
      return state;
  }
}

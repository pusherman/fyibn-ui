import { IAction } from '../../../store';
import { PostActions } from '../post/post.actions';
import { AuthActions } from '../auth/auth.actions';

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface Users {
  byId: {number?: User};
  isFetching: boolean;
  error: boolean;
}

const INITIAL_STATE: Users = {
  byId: {},
  isFetching: false,
  error: false,
};

export function userReducer(
    state: Users = INITIAL_STATE,
    action: IAction,
  ): Users {

  switch (action.type) {
    case PostActions.FETCH_POSTS_SUCCESSFUL:
      return Object.assign({}, state, {
        byId: Object.assign({}, state.byId, action.payload.entities.users),
        isFetching: false,
        error: false,
      });

    case AuthActions.AUTH_ENDED:
      return Object.assign({}, state, INITIAL_STATE);

    default:
      return state;
  }
}

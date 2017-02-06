import { IAction } from '../../../store';
import { PostActions } from './post.actions';
import { AuthActions } from '../auth/auth.actions';

export interface Post {
  id: number;
  title: string;
  url: string;
  commentCount: number;
  favoriteCount: number;
  lastCommentBy: string;
  created_at: Date;
}

export interface Posts {
  byId: {number?: Post};
  byPage: {number?: number[]};
  all: number[];
  isFetching: boolean;
  error: boolean;
}

const INITIAL_STATE: Posts = {
  byId: {},
  byPage: {},
  all: [],
  isFetching: false,
  error: false,
};

export function postReducer(
    state: Posts = INITIAL_STATE,
    action: IAction,
  ): Posts {

  switch (action.type) {
    case PostActions.FETCH_POSTS_REQUESTED:
      return Object.assign({}, state, {
        isFetching: true,
        error: false,
      });

    case PostActions.FETCH_POSTS_SUCCESSFUL:
      return Object.assign({}, state, {
        byId: Object.assign({}, state.byId, action.payload.entities.posts),
        byPage: Object.assign({}, state.byPage, action.payload.entities.byPage),
        all: state.all.concat(action.payload.result),
        isFetching: false,
        error: false,
      });

    case PostActions.FETCH_POSTS_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.payload,
      });

    case PostActions.FETCH_POST_SUCCESSFUL:
      const byId = Object.assign({}, state.byId, {[action.payload.id]: action.payload});
      return Object.assign({}, state, { byId });

    case AuthActions.AUTH_ENDED:
      return Object.assign({}, state, INITIAL_STATE);

    default:
      return state;
  }
}

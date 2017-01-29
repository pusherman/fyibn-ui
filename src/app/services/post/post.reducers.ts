import { IAction } from '../../../store';
import { PostActions } from './post.actions';

export interface Post {
  id: string;
  title: string;
  url: string;
  commentCount: number;
  favoriteCount: number;
  lastCommentBy: string;
  created_at: Date;
}

export interface Posts {
  latest: Post[];
  totalCount: number;
  isFetching: boolean;
  error: boolean;
}

const INITIAL_STATE: Posts = {
  latest: [],
  totalCount: 0,
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
        latest: [],
        isFetching: true,
        totalCount: 0,
        error: false,
      });

    case PostActions.FETCH_POSTS_SUCCESSFUL:
      return Object.assign({}, state, {
        latest: action.payload.posts,
        totalCount: action.payload.totalCount,
        isFetching: false,
        error: false,
      });

    case PostActions.FETCH_POSTS_FAILED:
      return Object.assign({}, state, {
        latest: [],
        totalCount: 0,
        isFetching: false,
        error: action.payload,
      });

    default:
      return state;
  }
}

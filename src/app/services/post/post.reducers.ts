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
  byId: {number?: Post};
  byPage: {number?: number[]};
  allPosts: number[];
  isFetching: boolean;
  error: boolean;
}

const INITIAL_STATE: Posts = {
  byId: {},
  byPage: {},
  allPosts: [],
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
        byId: {},
        allPosts: [],
        isFetching: true,
        error: false,
      });

    case PostActions.FETCH_POSTS_SUCCESSFUL:
      return Object.assign({}, state, {
        byId: action.payload.entities.posts,
        byPage: action.payload.entities.byPage,
        allPosts: state.allPosts.concat(action.payload.result),
        isFetching: false,
        error: false,
      });

    case PostActions.FETCH_POSTS_FAILED:
      return Object.assign({}, state, {
        byId: {},
        allPosts: [],
        isFetching: true,
        error: action.payload,
      });

    default:
      return state;
  }
}

import { IAction } from '../../../store';
import { PostActions } from './post.actions';
import { AuthActions } from '../auth/auth.actions';
import { CommentActions } from '../comment/comment.actions';
import { FavoriteActions } from '../favorite/favorite.actions';

export interface Post {
  id: number;
  title: string;
  url: string;
  favorites: number[];
  created_at: Date;
  comments: number[];
}

export interface Pagination {
  currentPage: number;
  lastPage: number;
  perPage: number;
  totalItems: number;
}

export interface Posts {
  byId: {number?: Post};
  byPage: {number?: number[]};
  pagination: Pagination;
  all: number[];
  isFetching: boolean;
  error: boolean;
}

const INITIAL_STATE: Posts = {
  byId: {},
  byPage: {},
  all: [],
  pagination: {
    currentPage: 1,
    lastPage: 1,
    perPage: 25,
    totalItems: 0,
  },
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
        pagination: action.payload.entities.pagination,
        isFetching: false,
        error: false,
      });

    case PostActions.FETCH_POSTS_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.payload,
      });

    case PostActions.FETCH_POST_SUCCESSFUL:
      return Object.assign({}, state, {
        byId: Object.assign({}, state.byId, action.payload.entities.posts),
      });

    case PostActions.CHANGE_PAGE_COMPLETE:
      console.log(action.payload);
      return Object.assign({}, state, {
        pagination: Object.assign({}, state.pagination, {
          currentPage: action.payload.page
        }),
      });

    case CommentActions.CREATE_COMMENT_SUCCESSFUL:
      return Object.assign({}, state, {
        byId: Object.assign({}, state.byId, {
          [action.payload.post_id]: Object.assign({}, state.byId[action.payload.post_id], {
            comments: [
              ...state.byId[action.payload.post_id].comments,
              action.payload.id,
            ],
          })
        })
      });

    case FavoriteActions.CREATE_FAVORITE_SUCCESSFUL:
      return Object.assign({}, state, {
        byId: Object.assign({}, state.byId, {
          [action.payload.post_id]: Object.assign({}, state.byId[action.payload.post_id], {
            favorites: [
              ...state.byId[action.payload.post_id].favorites,
              action.payload.id,
            ],
          })
        })
      })

    case AuthActions.AUTH_ENDED:
      return Object.assign({}, state, INITIAL_STATE);

    default:
      return state;
  }
}

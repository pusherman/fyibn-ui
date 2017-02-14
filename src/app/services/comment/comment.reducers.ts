import { IAction } from '../../../store';
import { PostActions } from '../post/post.actions';
import { CommentActions } from './comment.actions';

export interface Comment {
  id?: number;
  body: string;
  userId?: number;
  postId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Comments {
  byId: {number?: Comment};
  isFetching: boolean;
  error: boolean;
}

const INITIAL_STATE: Comments = {
  byId: {},
  isFetching: false,
  error: false,
};

export function commentReducer(
    state: Comments = INITIAL_STATE,
    action: IAction,
  ): Comments {

  switch (action.type) {
    case CommentActions.CREATE_COMMENT_REQUESTED:
      return Object.assign({}, state, {
        isFetching: true,
        error: false,
      });

    case CommentActions.CREATE_COMMENT_SUCCESSFUL:
      return Object.assign({}, state, {
        byId: Object.assign({}, state.byId, {[action.payload.id]: action.payload}),
        isFetching: false,
        error: false,
      });

    case CommentActions.CREATE_COMMENT_FAILED:
      return Object.assign({}, state, {
        isFetching: true,
        error: action.payload,
      });

    case PostActions.FETCH_POSTS_SUCCESSFUL:
      return Object.assign({}, state, {
        byId: Object.assign({}, state.byId, action.payload.entities.comments),
      });

    default:
      return state;
  }
}

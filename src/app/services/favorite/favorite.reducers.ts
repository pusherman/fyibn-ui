import { IAction } from '../../../store';
import { FavoriteActions } from './favorite.actions';
import { PostActions } from '../post/post.actions';
import { AuthActions } from '../auth/auth.actions';

export interface Favorite {
  id: number;
  user_id: number;
  post_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface Favorites {
  byId: { number?: Favorite };
  isFetching: boolean;
  error: boolean;
}

const INITIAL_STATE: Favorites = {
  byId: {},
  isFetching: false,
  error: false,
};

export function favoriteReducer(
    state: Favorites = INITIAL_STATE,
    action: IAction,
  ): Favorites {

  switch (action.type) {
    case FavoriteActions.CREATE_FAVORITE_REQUESTED:
    case FavoriteActions.REMOVE_FAVORITE_REQUESTED:
      return Object.assign({}, state, {
        isFetching: true,
        error: false,
      });

    case FavoriteActions.CREATE_FAVORITE_SUCCESSFUL:
      return Object.assign({}, state, {
        byId: Object.assign({}, state.byId, {[action.payload.id]: action.payload}),
        isFetching: false,
        error: false,
      });

    case PostActions.FETCH_POSTS_SUCCESSFUL:
      return Object.assign({}, state, {
        byId: Object.assign({}, state.byId, action.payload.entities.favorites),
      });

    case AuthActions.AUTH_ENDED:
      return Object.assign({}, state, INITIAL_STATE);

    default:
      return state;
  }
}

import { IAction } from '../../../store';
import { HistoryActions } from './history.actions';
import { AuthActions } from '../auth/auth.actions';

export interface PostHistory {
  id: number;
  user_id: number;
  post_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface History {
  byPostId: { number?: PostHistory };
  isFetching: boolean;
  error: boolean;
}

const INITIAL_STATE: History = {
  byPostId: {},
  isFetching: false,
  error: false,
};

export function historyReducer(
    state: History = INITIAL_STATE,
    action: IAction,
  ): History {

  switch (action.type) {
    case HistoryActions.CREATE_HISTORY_REQUESTED:
    case HistoryActions.REMOVE_HISTORY_REQUESTED:
    case HistoryActions.FETCH_HISTORY_REQUESTED:
      return Object.assign({}, state, {
        isFetching: true,
        error: false,
      });

    case HistoryActions.CREATE_HISTORY_SUCCESSFUL:
      return Object.assign({}, state, {
        byPostId: Object.assign({}, state.byPostId, {
          [action.payload.post_id]: action.payload
        }),
        isFetching: false,
        error: false,
      });

    case HistoryActions.REMOVE_HISTORY_SUCCESSFUL:
      const deletedId = action.payload.post_id;
      const byPostId = Object.assign({}, state.byPostId);

      delete byPostId[deletedId];

      return Object.assign({}, state, {
        isFetching: false,
        error: false,
        byPostId,
      });

    case HistoryActions.FETCH_HISTORY_RECEIVED:
      return {
        ...state,
        isFetching: false,
        error: false,
        byPostId: {
          ...state.byPostId,
          ...action.payload.entities.history,
        },
      }

    case AuthActions.AUTH_ENDED:
      return Object.assign({}, state, INITIAL_STATE);

    default:
      return state;
  }
}

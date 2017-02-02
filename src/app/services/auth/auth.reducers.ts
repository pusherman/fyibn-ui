import { IAction } from '../../../store';
import { AuthActions } from './auth.actions';

export interface IAuth {
  loggedIn: boolean;
  loggingIn: boolean;
  error?: any;
}

const INITIAL_STATE: IAuth = {
  loggedIn: false,
  loggingIn: false,
  error: false,
};

export function authReducer(state: IAuth = INITIAL_STATE, action: IAction): IAuth {
  switch (action.type) {
    case AuthActions.AUTH_REQUESTED:
      return Object.assign({}, state, {
        loggedIn: false,
        loggingIn: true,
        error: false,
      });

    case AuthActions.AUTH_SUCCESSFUL:
      return Object.assign({}, state, {
        loggedIn: true,
        loggingIn: false,
        error: false,
      });

    case AuthActions.AUTH_FAILED:
      return Object.assign({}, state, {
        loggedIn: false,
        loggingIn: false,
        error: action,
      });

    case AuthActions.AUTH_ENDED:
      return Object.assign({}, state, INITIAL_STATE);

    default:
      return state;
  }
}

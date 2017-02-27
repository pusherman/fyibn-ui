import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable';

import { AuthEpics } from '../app/services/auth/auth.epics';
import { PostEpics } from '../app/services/post/post.epics';
import { UserEpics } from '../app/services/user/user.epics';
import { CommentEpics } from '../app/services/comment/comment.epics';
import { FavoriteEpics } from '../app/services/favorite/favorite.epics';
import { HistoryEpics } from '../app/services/history/history.epics';

@Injectable()
export class RootEpic {
  public epics = [];

  constructor(
    private authEpics: AuthEpics,
    private postEpics: PostEpics,
    private userEpics: UserEpics,
    private commentEpics: CommentEpics,
    private favoriteEpics: FavoriteEpics,
    private historyEpics: HistoryEpics,
  ) {

    Array.from(arguments)
      .forEach(this.loadEpics.bind(this));
  }

  loadEpics(epicObject) {
    const epics = Object.keys(epicObject)
                    .filter(epic => typeof epicObject[epic] === 'function')
                    .map(epic => epicObject[epic]);

    this.epics.push(...epics);
  }

  combineAll() {
    return combineEpics(...this.epics);
  }
}

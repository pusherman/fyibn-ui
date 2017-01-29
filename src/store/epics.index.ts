import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable';

import { AuthEpics } from '../app/services/auth/auth.epics';
import { PostEpics } from '../app/services/post/post.epics';

@Injectable()
export class RootEpic {
  public epics = [];

  constructor(
    private authEpics: AuthEpics,
    private postEpics: PostEpics,
  ) {
    Array.from(arguments).forEach(epic => {
      this.loadEpic(epic);
    });
  }

  loadEpic(epic) {
    Object.keys(epic).forEach(property => {
      if (typeof epic[property] === 'function') {
        this.epics.push(epic[property]);
      }
    });
  }

  combineAll() {
    return combineEpics(...this.epics);
  }
}

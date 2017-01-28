import { Component, OnInit } from '@angular/core';
import { DevToolsExtension, NgRedux, select } from 'ng2-redux';
import { createEpicMiddleware } from 'redux-observable';
import { Observable } from 'rxjs/Observable';

import { RootEpic } from '../store/epics.index';
import { IAppState, rootReducer } from '../store/index';

const createLogger = require('redux-logger');
const persistState = require('redux-localstorage');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @select(['auth', 'loggedIn']) loggedIn$: Observable<boolean>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension,
    private rootEpic: RootEpic,
  ) {
    const middleware = [
      createEpicMiddleware(this.rootEpic.combineAll()),
      createLogger(),
    ];

    const enhancers = [
      persistState(undefined, { key: 'fyibn/store' }),
    ];

    if (devTool.isEnabled()) {
      enhancers.push(devTool.enhancer());
    }

    this.ngRedux.configureStore(
      rootReducer,
      {} as IAppState,
      middleware,
      enhancers,
    );
  }

  ngOnInit() { }
}

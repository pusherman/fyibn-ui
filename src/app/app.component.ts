import { Component, OnInit } from '@angular/core';
import { DevToolsExtension, NgRedux, select } from '@angular-redux/store';
import { createEpicMiddleware } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { Router, NavigationEnd } from '@angular/router';

import { RootEpic } from '../store/epics.index';
import { IAppState, rootReducer } from '../store/index';

import * as createLogger from 'redux-logger';
import persistState from 'redux-localstorage';

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
    private router: Router,
  ) {
    const middleware = [
      createEpicMiddleware(this.rootEpic.combineAll()),
      createLogger(),
    ];

    const enhancers = [
      persistState(undefined, 'fyibn/store'),
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

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd === false) {
        return;
      }
      document.body.scrollTop = 0;
    });
  }
}

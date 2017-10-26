import { Component, OnInit } from '@angular/core';
import { DevToolsExtension, NgRedux, select } from '@angular-redux/store';
import { createEpicMiddleware } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { Router, NavigationEnd } from '@angular/router';
import { compose } from 'redux';

import { RootEpic } from '../store/epics.index';
import { IAppState, rootReducer } from '../store/index';
import { createLogger } from 'redux-logger';


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

    const enhancers = [];

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

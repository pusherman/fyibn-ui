import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgReduxModule } from 'ng2-redux';

import { RootEpic } from '../store/epics.index';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.route';
import { FyibnNavComponent } from './fyibn-nav/fyibn-nav.component';
import { PostListModule } from './post-list/post-list.module';
import { PostViewModule } from './post-view/post-view.module';
import { PostFormModule } from './post-form/post-form.module';
import { LoginFormModule } from './login-form/login-form.module';
import { AuthModule } from './services/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    FyibnNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    NgReduxModule,
    PostListModule,
    PostViewModule,
    PostFormModule,
    LoginFormModule,
    AuthModule,
  ],
  providers: [
    RootEpic,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

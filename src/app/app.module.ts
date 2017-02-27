import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgReduxModule } from 'ng2-redux';
import { MomentModule } from 'angular2-moment';
import { RootEpic } from '../store/epics.index';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.route';

import { FyibnNavComponent } from './fyibn-nav/fyibn-nav.component';

import { PostListModule } from './post-list/post-list.module';
import { PostViewModule } from './post-view/post-view.module';
import { PostFormModule } from './post-form/post-form.module';
import { LoginFormModule } from './login-form/login-form.module';
import { AuthModule } from './services/auth/auth.module';
import { PostModule } from './services/post/post.module';
import { UserModule } from './services/user/user.module';
import { CommentModule } from './services/comment/comment.module';
import { FavoriteModule } from './services/favorite/favorite.module';
import { HistoryModule } from './services/history/history.module';

import { ApiService } from './services/api/api.service';

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
    MomentModule,
    PostListModule,
    PostViewModule,
    PostFormModule,
    LoginFormModule,
    AuthModule,
    PostModule,
    UserModule,
    CommentModule,
    FavoriteModule,
    HistoryModule,
  ],
  providers: [
    RootEpic,
    ApiService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

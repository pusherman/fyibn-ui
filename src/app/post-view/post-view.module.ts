import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { PostViewComponent } from './post-view.component';
import { PostViewRoutingModule } from './post-view.route';

import { CommentListComponent } from '../comment-list/comment-list.component';
import { CommentListItemComponent } from '../comment-list-item/comment-list-item.component';
import { AddCommentComponent } from '../add-comment/add-comment.component';

@NgModule({
  imports: [
    PostViewRoutingModule,
    CommonModule,
    SharedModule,
    MomentModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PostViewComponent,
    CommentListComponent,
    CommentListItemComponent,
    AddCommentComponent,
  ],
  providers: [
  ],
})
export class PostViewModule { }

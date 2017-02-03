import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CommentService } from './comment.service';
import { CommentActions } from './comment.actions';
import { CommentEpics } from './comment.epics';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
  ],
  providers: [
    CommentActions,
    CommentEpics,
    CommentService,
  ],
})
export class CommentModule { }

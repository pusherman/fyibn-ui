import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PostService } from './post.service';
import { PostActions } from './post.actions';
import { PostEpics } from './post.epics';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
  ],
  providers: [
    PostActions,
    PostEpics,
    PostService,
  ],
})
export class PostModule { }

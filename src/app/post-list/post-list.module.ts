import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PostListComponent } from './post-list.component';
import { PostListItemComponent } from '../post-list-item/post-list-item.component';
import { PostListRoutingModule } from './post-list.route';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    PostListRoutingModule,
    SharedModule,
    CommonModule,
  ],
  declarations: [
    PostListComponent,
    PostListItemComponent,
  ],
  providers: [
  ],
})
export class PostListModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PostListComponent } from './post-list.component';
import { PostListItemComponent } from '../post-list-item/post-list-item.component';
import { DopeButtonComponent } from '../dope-button/dope-button.component';
import { PostListRoutingModule } from './post-list.route';

@NgModule({
  imports: [
    PostListRoutingModule,
    CommonModule,
  ],
  declarations: [
    PostListComponent,
    PostListItemComponent,
    DopeButtonComponent,
  ],
  providers: [
  ],
})
export class PostListModule { }

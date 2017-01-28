import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PostViewComponent } from './post-view.component';
import { PostViewRoutingModule } from './post-view.route';

@NgModule({
  imports: [
    PostViewRoutingModule,
    CommonModule,
  ],
  declarations: [
    PostViewComponent,
  ],
  providers: [
  ],
})
export class PostViewModule { }

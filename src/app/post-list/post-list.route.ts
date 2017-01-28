import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostListComponent } from './post-list.component';
import { AuthGuard } from '../services/auth/auth.guard';

const postListRoute: Routes = [
  {
    path: '',
    component: PostListComponent,
    canActivate: [ AuthGuard ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(postListRoute),
  ],
  exports: [
    RouterModule,
  ],
})
export class PostListRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostViewComponent } from './post-view.component';
import { AuthGuard } from '../services/auth/auth.guard';

const postViewRoute: Routes = [
  {
    path: 'post/:id',
    component: PostViewComponent,
    canActivate: [ AuthGuard ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(postViewRoute),
  ],
  exports: [
    RouterModule,
  ],
})
export class PostViewRoutingModule { }

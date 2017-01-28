import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostFormComponent } from './post-form.component';
// import { AuthGuard } from '../services/auth/auth.guard';

const postFormRoute: Routes = [
  {
    path: 'post/new',
    component: PostFormComponent,
    // canActivate: [ AuthGuard ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(postFormRoute),
  ],
  exports: [
    RouterModule,
  ],
})
export class PostFormRoutingModule { }

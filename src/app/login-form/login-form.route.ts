import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent } from './login-form.component';

const loginFormRoute: Routes = [
  {
    path: 'login',
    component: LoginFormComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(loginFormRoute),
  ],
  exports: [
    RouterModule,
  ],
})
export class LoginFormRoutingModule { }

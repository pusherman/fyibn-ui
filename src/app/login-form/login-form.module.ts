import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginFormComponent } from './login-form.component';
import { LoginFormRoutingModule } from './login-form.route';

@NgModule({
  imports: [
    LoginFormRoutingModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LoginFormComponent,
  ],
  providers: [
  ],
})
export class LoginFormModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthService } from './auth.service';
import { AuthActions } from './auth.actions';
import { AuthEpics } from './auth.epics';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
  ],
  providers: [
    AuthActions,
    AuthEpics,
    AuthGuard,
    AuthService,
  ],
})
export class AuthModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserService } from './user.service';
import { UserActions } from './user.actions';
import { UserEpics } from './user.epics';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
  ],
  providers: [
    UserActions,
    UserEpics,
    UserService,
  ],
})
export class UserModule { }

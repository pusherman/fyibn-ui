import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PostFormComponent } from './post-form.component';
import { PostFormRoutingModule } from './post-form.route';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    PostFormRoutingModule,
    SharedModule,
    CommonModule,
  ],
  declarations: [
    PostFormComponent,
  ],
  providers: [
  ],
})
export class PostFormModule { }

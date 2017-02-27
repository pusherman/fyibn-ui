import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'angular2-moment';

import { PageHeaderComponent } from '../page-header/page-header.component';
import { DopeButtonComponent } from '../dope-button/dope-button.component';
import { ByLineComponent } from '../by-line/by-line.component';
import { PostPointsComponent } from '../post-points/post-points.component';

@NgModule({
  imports: [
    CommonModule,
    MomentModule,
  ],
  declarations: [
    PageHeaderComponent,
    DopeButtonComponent,
    ByLineComponent,
    PostPointsComponent,
  ],
  exports: [
    PageHeaderComponent,
    DopeButtonComponent,
    ByLineComponent,
    PostPointsComponent,
  ]
})
export class SharedModule { }

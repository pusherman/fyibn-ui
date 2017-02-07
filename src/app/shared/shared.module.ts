import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'angular2-moment';

import { PageHeaderComponent } from '../page-header/page-header.component';
import { DopeButtonComponent } from '../dope-button/dope-button.component';
import { ByLineComponent } from '../by-line/by-line.component';

@NgModule({
  imports: [
    CommonModule,
    MomentModule,
  ],
  declarations: [
    PageHeaderComponent,
    DopeButtonComponent,
    ByLineComponent,
  ],
  exports: [
    PageHeaderComponent,
    DopeButtonComponent,
    ByLineComponent,
  ]
})
export class SharedModule { }

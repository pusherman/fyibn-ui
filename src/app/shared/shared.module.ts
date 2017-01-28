import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderComponent } from '../page-header/page-header.component';
import { DopeButtonComponent } from '../dope-button/dope-button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PageHeaderComponent,
    DopeButtonComponent,
  ],
  exports: [
    PageHeaderComponent,
    DopeButtonComponent,
  ]
})
export class SharedModule { }

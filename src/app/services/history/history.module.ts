import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HistoryService } from './history.service';
import { HistoryActions } from './history.actions';
import { HistoryEpics } from './history.epics';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
  ],
  providers: [
    HistoryActions,
    HistoryEpics,
    HistoryService,
  ],
})
export class HistoryModule { }

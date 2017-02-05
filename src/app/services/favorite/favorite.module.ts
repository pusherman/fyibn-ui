import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FavoriteService } from './favorite.service';
import { FavoriteActions } from './favorite.actions';
import { FavoriteEpics } from './favorite.epics';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
  ],
  providers: [
    FavoriteActions,
    FavoriteEpics,
    FavoriteService,
  ],
})
export class FavoriteModule { }

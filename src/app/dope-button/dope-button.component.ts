import { Component, OnInit, Input } from '@angular/core';

import { FavoriteActions } from '../services/favorite/favorite.actions';


@Component({
  selector: 'dope-button',
  templateUrl: './dope-button.component.html',
  styleUrls: ['./dope-button.component.css']
})
export class DopeButtonComponent implements OnInit {
  @Input() postId: number;

  private favorited = false;

  constructor(private actions: FavoriteActions) { }

  ngOnInit() {
  }

  toggleFavorite() {
    const payload = { post_id: this.postId };

    if (this.favorited) {
      this.actions.remove(payload);
    } else {
      this.actions.create(payload);
    }
  }
}

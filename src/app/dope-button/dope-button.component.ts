import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';

import { Post, Posts } from '../services/post/post.reducers';
import { FavoriteActions } from '../services/favorite/favorite.actions';
import { Favorites, Favorite } from '../services/favorite/favorite.reducers';

@Component({
  selector: 'dope-button',
  templateUrl: './dope-button.component.html',
  styleUrls: ['./dope-button.component.css']
})
export class DopeButtonComponent implements OnInit, OnDestroy {
  @Input() post = <Post>null;
  @select() favorites$: Observable<Favorites>;
@select() posts$;
@select(['favorites', 'byId']) favoritesById$: Observable<Favorites>;
  private favorited = false;
  public isSubmitting = false;
  private subscription: Subscription;

  constructor(private actions: FavoriteActions) { }

  ngOnInit() {
    const me: number = Number(localStorage.getItem('me'));

    this.subscription = Observable.combineLatest(
      this.posts$,
      this.favorites$,
      (posts: Posts, favorites) =>
        posts.byId[this.post.id]
          .favorites
          .map(id => favorites.byId[id])
    )
    .subscribe(postFavorites => {
      this.favorited = postFavorites.some(favorite => {
        if (!favorite) {
          return false;
        }

        return favorite.user_id === me;
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleFavorite() {
    const payload = { post_id: this.post.id };

    if (this.favorited) {
      this.actions.remove(payload);

    } else {
      this.actions.create(payload);
    }
  }
}

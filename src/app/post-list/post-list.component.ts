import { Component, OnInit, OnDestroy } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { PostActions } from '../services/post/post.actions';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  @select(['posts', 'all']) posts$: Observable<number[]>;
  private postsSub: Subscription;

  constructor(private actions: PostActions) { }

  ngOnInit() {
    this.postsSub = this.posts$
      .subscribe(posts => {
        if (posts.length < 25) {
          this.actions.getPosts();
        }
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}

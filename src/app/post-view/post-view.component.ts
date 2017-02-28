import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';

import { PostActions } from '../services/post/post.actions';
import { Posts, Post } from '../services/post/post.reducers';
import { HistoryActions } from '../services/history/history.actions';

@Component({
  selector: 'post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit, OnDestroy {
  @select() posts$: Observable<Posts>;

  public post: Post;
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postActions: PostActions,
    private historyActions: HistoryActions,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loadPost(+params['id']);
    });
  }

  ngOnDestroy() {
    this.subscription
      .unsubscribe();
  }

  loadPost(id: number): void {
    this.subscription = this.posts$
      .subscribe(posts => {
        if (posts.byId[id] !== undefined) {
          this.post = posts.byId[id];
          this.historyActions.create({ post_id: id });

        } else {
          this.postActions.getPost(id);
        }
      });
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { Posts } from '../services/post/post.reducers';
import { History } from '../services/history/history.reducers';
import { PostActions } from '../services/post/post.actions';
import { HistoryActions } from '../services/history/history.actions';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  @select(['posts']) posts$: Observable<any>;
  @select(['history']) history$: Observable<any>;

  public posts: number[];
  private postsSub: Subscription;
  private historySub: Subscription;
  private page: Observable<number>;

  constructor(
    private actions: PostActions,
    private historyActions: HistoryActions,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.historyActions.fetchIfNeeded();

    this.route
      .queryParams
      .map(params => Number(params['page']) || 1)
      .subscribe(page => this.loadPosts(page));
  }

  loadPosts(page: number): void {
    this.postsSub = this.posts$
      .subscribe(posts => this.setPostsFromStore(posts, page));
  }

  // setHistoryFromStore(history: History) {
  //   if (history.isFetching || history.error !== false) {
  //     return;
  //   }

  //   if (Object.keys(history.byPostId).length !== 0) {
  //     this.history = history;
  //   }
  // }

  setPostsFromStore(posts: Posts, page: number) {
    if (posts.isFetching || posts.error !== false) {
      return;
    }

    if (posts.byPage[page] !== undefined) {
      this.posts = posts.byPage[page];

    } else {
      this.actions.getPosts(page);
    }
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { PostActions } from '../services/post/post.actions';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  @select(['posts']) posts$: Observable<any>;

  public posts: number[];
  private postsSub: Subscription;
  private page: Observable<number>;

  constructor(
    private actions: PostActions,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route
      .queryParams
      .map(params => +params['page'] || 1)
      .subscribe(page => this.loadPosts(page));
  }

  loadPosts(page: number): void {
    this.postsSub = this.posts$
      .subscribe(posts =>
        this.setPostsFromStore(posts, page)
      );
  }

  setPostsFromStore(posts, page) {
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

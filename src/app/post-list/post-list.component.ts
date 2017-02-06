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
  @select(['posts', 'byPage']) postsByPage$: Observable<any>;

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
    this.postsSub = this.postsByPage$
      .subscribe(pages => {
        if (pages[page] !== undefined) {
          this.posts = pages[page];

        } else {
          this.actions.getPosts(page);
        }
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}

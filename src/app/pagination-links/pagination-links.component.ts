import { Component, OnInit, OnDestroy } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { PostActions } from '../services/post/post.actions';

@Component({
  selector: 'pagination-links',
  templateUrl: './pagination-links.component.html',
  styleUrls: ['./pagination-links.component.css']
})
export class PaginationLinksComponent implements OnInit, OnDestroy {
  @select(['posts', 'pagination', 'currentPage']) currentPage$: Observable<number>;
  @select(state =>
    state.posts.pagination.totalItems / state.posts.pagination.perPage
   ) totalPages$: Observable<number>;

  private subscription: Subscription;
  public pages: number[];
  constructor() { }

  ngOnInit() {
    this.subscription = this.totalPages$
      .subscribe(totalPages => {
        this.pages = Array(totalPages)
          .fill(1)
          .map((value, index) => value + index);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { PostActions } from '../services/post/post.actions';
import { Pagination } from '../services/post/post.reducers';

@Component({
  selector: 'pagination-links',
  templateUrl: './pagination-links.component.html',
  styleUrls: ['./pagination-links.component.css']
})
export class PaginationLinksComponent implements OnInit, OnDestroy {
  @select(['posts', 'pagination']) pagination$: Observable<Pagination>;

  private subscription: Subscription;
  public pages: number[];

  constructor() { }

  ngOnInit() {
    this.subscription = this.pagination$
      .subscribe(pagination => {
        const totalPages = Math.ceil(pagination.totalItems / pagination.perPage);

        this.pages = Array(totalPages)
          .fill(1)
          .map((value, index) => value + index);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

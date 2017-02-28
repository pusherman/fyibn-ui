import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
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
  public currentPage: number;

  constructor(
    private actions: PostActions,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.subscription = this.pagination$
      .subscribe(pagination => {
        const totalPages = Math.ceil(pagination.totalItems / pagination.perPage);

        this.currentPage = pagination.currentPage;
        this.pages = Array(totalPages)
          .fill(1)
          .map((value, index) => value + index);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  changePage(page): void {
    this.actions.changePage(page);
    this.router.navigate(['/'], {
      queryParams: { page }
    });
  }

  nextPage(): void {
    this.changePage(this.currentPage + 1);
  }

  previousPage(): void {
    this.changePage(this.currentPage - 1);
  }

  isCurrentPage(page): boolean {
    return page === this.currentPage;
  }
}

import { Component, OnInit } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { PostActions } from '../services/post/post.actions';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  @select(['posts', 'latest']) latestPosts$: Observable<string>;

  constructor(private actions: PostActions) { }

  ngOnInit() {
    this.actions.getLatest();
  }
}

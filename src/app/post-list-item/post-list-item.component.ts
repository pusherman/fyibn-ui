import { Component, Input, OnInit } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { Post } from '../services/post/post.reducers';

@Component({
  selector: 'post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit {
  @Input() postId;
  @select(['posts', 'byId']) postsById$: Observable<Post[]>;
  public post: Post;

  constructor() { }

  ngOnInit() {
    this.postsById$
      .subscribe(posts => {
        this.post = posts[this.postId];
      });

  }



}

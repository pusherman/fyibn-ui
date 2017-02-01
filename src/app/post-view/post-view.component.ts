import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { select } from 'ng2-redux';

import { PostActions } from '../services/post/post.actions';
import { Post } from '../services/post/post.reducers';

@Component({
  selector: 'post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {
  @select(['posts', 'byId']) postsById$: Observable<Post[]>;
  public post: Post;

  constructor(
    private route: ActivatedRoute,
    private actions: PostActions,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loadPost(+params['id']);
    });
  }

  loadPost(id: number): void {
    this.postsById$
      .subscribe(posts => {
        if (posts[id] !== undefined) {
          this.post = posts[id];

        } else {
          this.actions.getPost(id);
        }
      });
  }

}

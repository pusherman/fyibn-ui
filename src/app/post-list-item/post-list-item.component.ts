import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Post } from '../services/post/post.reducers';
import { Comment } from '../services/comment/comment.reducers';
import { User } from '../services/user/user.reducers';

@Component({
  selector: 'post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit, OnDestroy {
  @Input() postId: number;
  @select(['posts', 'byId']) postsById$: Observable<Post[]>;
  @select(['comments', 'byId']) commentsById$: Observable<Comment[]>;
  @select(['users', 'byId']) usersById$: Observable<User[]>;

  public post: Post;
  public lastComment: Comment;
  public lastCommenter: User;
  private postSubscription: Subscription;
  private commentSubscription: Subscription;
  private userSubscription: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.postSubscription = this.postsById$
      .subscribe(posts => {
        this.post = posts[this.postId];

        if (this.post.comments.length > 0) {
          const lastCommentId = this.post.comments[this.post.comments.length - 1];
          this.loadLastComment(lastCommentId);
        }
      });

  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();

    if (this.commentSubscription !== undefined) {
      this.commentSubscription.unsubscribe();
      this.userSubscription.unsubscribe();
    }
  }

  loadLastComment(lastCommentId?: number): void {
    this.commentSubscription = this.commentsById$
      .subscribe(comments => {
        this.lastComment = comments[lastCommentId];
        this.loadLastCommenter(this.lastComment.user_id);
      });
  }

  loadLastCommenter(lastCommenterId: number): void {
    this.userSubscription = this.usersById$
      .subscribe(users => {
        this.lastCommenter = users[lastCommenterId];
      })

  }
}

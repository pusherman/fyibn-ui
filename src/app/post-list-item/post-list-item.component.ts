import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Post } from '../services/post/post.reducers';
import { Comment } from '../services/comment/comment.reducers';
import { User } from '../services/user/user.reducers';
import { History } from '../services/history/history.reducers';

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
  @select() history$: Observable<History>;

  public post: Post;
  public lastComment: Comment;
  public lastCommenter: User;
  public isNewPost = true;
  private postSubscription: Subscription;
  private commentSubscription: Subscription;
  private userSubscription: Subscription;
  private historySubscription: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.postSubscription = this.postsById$
      .subscribe(posts => {
        this.post = posts[this.postId];
        this.setNewPostFlag(this.post);

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

  setNewPostFlag(post: Post): void {
    this.historySubscription = this.history$
      .subscribe(history => {
        const postHistory = history.byPostId[post.id];

        if (postHistory) {
          this.isNewPost = post.created_at > postHistory.updated_at;
        }
      });
  }

  loadLastComment(lastCommentId?: number): void {
    this.commentSubscription = this.commentsById$
      .subscribe(comments => {
        this.lastComment = comments[lastCommentId];
        if (this.lastComment) {
          this.loadLastCommenter(this.lastComment.user_id);
        }
      });
  }

  loadLastCommenter(lastCommenterId: number): void {
    this.userSubscription = this.usersById$
      .subscribe(users => {
        this.lastCommenter = users[lastCommenterId];
      })

  }
}

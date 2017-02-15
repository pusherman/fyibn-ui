import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { select } from 'ng2-redux';

import { Comments, Comment } from '../services/comment/comment.reducers';

@Component({
  selector: 'comment-list-item',
  templateUrl: './comment-list-item.component.html',
  styleUrls: ['./comment-list-item.component.css']
})
export class CommentListItemComponent implements OnInit, OnDestroy {
  @Input() commentId: number;
  @select() comments$: Observable<Comments>

  private subscription: Subscription;
  public comment: Comment;
  constructor() { }

  ngOnInit() {
    this.subscription = this.comments$
      .subscribe(comments => {
        this.comment = comments.byId[this.commentId];
      });
  }

  ngOnDestroy() {
    this.subscription
      .unsubscribe();
  }
}

import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { select } from 'ng2-redux';

import { CommentForm } from './add-comment.interface';
import { CommentActions } from '../services/comment/comment.actions';
import { Comments } from '../services/comment/comment.reducers';

@Component({
  selector: 'add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit, OnDestroy {
  @Input() postId: number;
  @select(['comments', 'isFetching']) isSubmitting$: Observable<boolean>;

  public comment: FormGroup;
  public isSubmitting = false;
  private subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private actions: CommentActions,
  ) { }

  ngOnInit() {
    this.comment = this.formBuilder.group({
      body: ['', Validators.required],
    });

    this.subscription = this.isSubmitting$
      .subscribe(isSubmitting => {
        this.isSubmitting = isSubmitting;
      });
  }

  ngOnDestroy() {
    this.subscription
      .unsubscribe();
  }

  onSubmit({ value, valid }: { value: CommentForm, valid: boolean }) {
    if (valid) {
      this.actions.create({
        body: value.body,
        post_id: this.postId,
      });

      this.comment.setValue({ body: null });
    }
  }
}

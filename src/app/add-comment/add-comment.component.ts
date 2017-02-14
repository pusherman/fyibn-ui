import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { select } from 'ng2-redux';

import { Comment } from './add-comment.interface';
import { CommentActions } from '../services/comment/comment.actions';

@Component({
  selector: 'add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  @Input() postId: number;

  public comment: FormGroup;
  private subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private actions: CommentActions,
  ) { }

  ngOnInit() {
    this.comment = this.formBuilder.group({
      body: ['', Validators.required],
    });
  }

  onSubmit({ value, valid }: { value: Comment, valid: boolean }) {
    if (valid) {
      this.actions.create({
        body: value.body,
        postId: this.postId,
      });
    }
  }
}

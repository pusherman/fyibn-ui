import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Comment } from './add-comment.interface';

@Component({
  selector: 'add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit, OnDestroy {
  @Input() postId: number;
  public comment: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.comment = this.formBuilder.group({
      body: ['', Validators.required],
    });

    console.log(this.postId);
  }

  ngOnDestroy() {
    console.log('destroying add comment');
  }

  onSubmit({ value, valid }: { value: Comment, valid: boolean }) {
    if (valid) {
      console.log('submitting', value.body, this.postId);
      // this.actions.addComment(value.body);
    }
  }

}

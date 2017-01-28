import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  public comments;
  constructor() { }

  ngOnInit() {
    this.comments = [
      {
        by: 'Corey',
        comment: 'this is a test',
      },
      {
        by: 'Hayden',
        comment: 'this is a test',
      },
    ];
  }
}

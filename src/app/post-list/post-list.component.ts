import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  public posts;

  constructor() { }

  ngOnInit() {
    this.posts = [
      {
        by: 'Corey',
        title: 'Test',
      },
      {
        by: 'Corey',
        title: 'Test',
      },
      {
        by: 'Corey',
        title: 'Test',
      },
    ];
  }

}

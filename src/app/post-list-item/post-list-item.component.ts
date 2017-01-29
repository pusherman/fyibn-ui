import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit {
  @Input() post;
  constructor() { }

  ngOnInit() {

  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'post-points',
  templateUrl: './post-points.component.html',
  styleUrls: ['./post-points.component.css']
})
export class PostPointsComponent implements OnInit {
  @Input() points: number = 0;

  constructor() { }

  ngOnInit() {
  }

}

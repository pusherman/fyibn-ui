import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { select } from 'ng2-redux';

import { User } from '../services/user/user.reducers';


@Component({
  selector: 'by-line',
  templateUrl: './by-line.component.html',
  styleUrls: ['./by-line.component.css']
})
export class ByLineComponent implements OnInit, OnDestroy {
  @Input() userId: number;
  @Input() byDate: Date;
  @select(['users', 'byId']) users$: Observable<User[]>;
  public user: User;
  private subscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.subscription = this.users$.subscribe((users) => {
      this.user = users[this.userId];
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

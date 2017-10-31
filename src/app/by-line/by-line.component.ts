import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';

import { User } from '../services/user/user.reducers';
import { UserActions } from '../services/user/user.actions';


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

  constructor(
    private actions: UserActions,
  ) { }

  ngOnInit() {
    this.subscription = this.users$
      .subscribe((users) => {
        if (users[this.userId] !== undefined) {
          this.user = users[this.userId];
        } else {
          this.actions.getUser(this.userId);
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

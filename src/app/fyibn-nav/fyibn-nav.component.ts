import { Component, OnInit } from '@angular/core';
import { AuthActions } from '../services/auth/auth.actions';

@Component({
  selector: 'fyibn-nav',
  templateUrl: './fyibn-nav.component.html',
  styleUrls: ['./fyibn-nav.component.css']
})
export class FyibnNavComponent implements OnInit {

  constructor(private actions: AuthActions) { }

  ngOnInit() {
  }

  logout() {
    this.actions.logout();
  }
}

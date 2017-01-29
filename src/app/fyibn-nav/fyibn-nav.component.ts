import { Component, OnInit } from '@angular/core';
import { AuthActions } from '../services/auth/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'fyibn-nav',
  templateUrl: './fyibn-nav.component.html',
  styleUrls: ['./fyibn-nav.component.css']
})
export class FyibnNavComponent implements OnInit {

  constructor(
    private actions: AuthActions,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.router.navigate(['/login']);
    this.actions.logout();
  }
}

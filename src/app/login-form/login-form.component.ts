import { Component, OnInit } from '@angular/core';
import { AuthActions } from '../services/auth/auth.actions';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private actions: AuthActions) { }

  ngOnInit() { }

  login() {
    this.actions.login('', '');
  }

}

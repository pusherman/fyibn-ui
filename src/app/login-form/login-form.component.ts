import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { select } from 'ng2-redux';

import { AuthActions } from '../services/auth/auth.actions';
import { Login } from './login-form.interface';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @select(['auth', 'loggedIn']) loggedIn$: Observable<boolean>;
  public login: FormGroup;

  constructor(
     private actions: AuthActions,
     private router: Router,
     private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.login = this.formBuilder.group({
      username: ['phpuser@gmail.com', Validators.required],
      password: ['testing', Validators.required],
      rememberMe: [false, Validators.required],
    });

    this.loggedIn$
      .filter(loggedIn => loggedIn === true)
      .subscribe(() => this.router.navigate(['/']));
  }

  onSubmit({ value, valid }: { value: Login, valid: boolean }) {
    if (valid) {
      this.actions.login(value.username, value.password);
    }
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    if (localStorage.getItem('access_token')) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}

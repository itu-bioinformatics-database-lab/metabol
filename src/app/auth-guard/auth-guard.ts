import { CanActivate, Router }    from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    console.log('AuthGuard#canActivate called');
    //return false;
    if (localStorage.getItem('access_token') !== null) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;

  }

}

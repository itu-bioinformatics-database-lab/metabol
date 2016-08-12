import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {AppSettings} from '../../../app/';
import {NotificationsService} from 'angular2-notifications'

@Injectable()
export class LoginService {
  options: RequestOptions;

  constructor(private http: Http, private router: Router, private notify: NotificationsService) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    this.options = new RequestOptions({ headers: headers });
  }

  login(loginForm, callback: (data) => void) {
    let tokenData = `grant_type=password&username=${loginForm.Email}&password=${loginForm.Password}`;
    let url = `${AppSettings.API_ENDPOINT}/Token`;
    this.http.post(url, tokenData, this.options)
      .map(res => res.json())
      .subscribe(
      data => {
        callback(data);
        this.notify.success('Login Successful', 'Welcome');
        localStorage.setItem('access_token', data.access_token);
      },
      error => {
        if (error.status == 400)
          this.notify.error('Login Fail', error.json().error_description);
      });
  }

  logout() {
    localStorage.removeItem('access_token');
    return this.http
      .post(`${AppSettings.API_ENDPOINT}/account/Logout`, this.options)
      .subscribe(
      response => {
        this.notify.info('Logged out', 'Goodbye');
        this.router.navigate(['/login']);
      });

  }

  isLoggedIn() {
    return localStorage.getItem('access_token') !== null
  }

  token() {
    return `Bearer ${localStorage.getItem('access_token')}`;
  }

  optionByAuthorization() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (this.isLoggedIn())
      headers.append('Authorization', this.token());
    return new RequestOptions({ headers: headers });
  }

}

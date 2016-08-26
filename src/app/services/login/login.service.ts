import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {AppSettings} from '../../../app/';
import {NotificationsService} from 'angular2-notifications';

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
        localStorage.setItem('userName', data.userName);
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

  changePassword(signupForm, callback: () => void) {
    let url = `${AppSettings.API_ENDPOINT}/account/ChangePassword`;
    this.http.post(url, signupForm, this.optionByAuthorization())
      .subscribe(
      () => {
        this.notify.success('Password Changed Successfully', '');
        callback();
      },
      error => {
        if (error.status == 400) {
          let errorContent = error.json()
          for (let em in errorContent.modelState)
            for (let e of errorContent.modelState[em])
              this.notify.error(errorContent.message, e);
        }
      });
  }

  userInfo(callback: (data) => void) { //Gets user info to fill My Profile part in panel
    let url = `${AppSettings.API_ENDPOINT}/account/UserInfo`; //User infoda ad soyad göstermiyor bu nedenle bu adresi kullandım
     this.http.get(url, this.optionByAuthorization())
      .map(response => response.json())
      .subscribe(data => {
        callback(data)
      });
  }

  submitUserInfo(value, callback: (data) => void) {
    let url = `${AppSettings.API_ENDPOINT}/account/Update`;
    this.http.post(url, value, this.optionByAuthorization())
      .map(res => res.json())
      .subscribe(
      data => {
        callback(data);
        this.notify.success('Password Changed Successfully', '')},

      error => {
        if (error.status == 400)
          this.notify.error('An Error Occured', error.json().error_description);
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

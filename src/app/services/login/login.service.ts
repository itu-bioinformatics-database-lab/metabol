import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {AppSettings} from '../../../app/';
import {NotificationsService} from 'angular2-notifications'

@Injectable()
export class LoginService {
  headers: Headers;
  token: string;
  token2: string;
  data2: string;
  options: RequestOptions;

  constructor(private http: Http, private router: Router, private notify: NotificationsService) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
  }

  login(loginForm, callback: (data) => void) {
    let tokenData = `grant_type=password&username=${loginForm.Email}&password=${loginForm.Password}`;
    let url = `${AppSettings.API_ENDPOINT}/Token`;
    this.http.post(url, tokenData, { headers: this.headers })
      .map(res => res.json())
      .subscribe(
      data => {
        callback(data);
        this.notify.success('Login Successful','Welcome');
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
      .post(`${AppSettings.API_ENDPOINT}/account/Logout`, { headers: this.headers })
      .subscribe(
      response => {
        this.notify.info('Logouted', 'Goodbye');
        this.router.navigate(['/login']);
      });

  }

  changePassword(signupForm, callback: () => void){
        let url = `${AppSettings.API_ENDPOINT}/account/ChangePassword`;
        console.log(signupForm)
        this.http.post(url, signupForm, this.login.optionByAuthorization())
          .subscribe(
          () => {
            this.notify.success('Password Changed Successfully','');
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

  isLoggedIn() {
    return localStorage.getItem('access_token') !== null
  }

}

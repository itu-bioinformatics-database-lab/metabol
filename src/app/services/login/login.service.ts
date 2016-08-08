import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {AppSettings} from '../../../app/';


@Injectable()
export class LoginService {
  headers: Headers;
  token: string;
  token2: string;
  data2: string;
  options: RequestOptions;

  constructor(private http: Http, private router: Router) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
  }

  login(value) {

    var token_data = "grant_type=password&username=" + value.Email + "&password=" + value.Password;

    return this.http
      .post(`${AppSettings.API_ENDPOINT}/Token`, token_data, { headers: this.headers })
      .map(res => {
        let data = res.json();
        localStorage.setItem('access_token', data.access_token);
      });

  }

  logout() {
    localStorage.removeItem('access_token');
    return this.http
      .post(`${AppSettings.API_ENDPOINT}/account/Logout`, { headers: this.headers })
      .subscribe(
      response => {
        this.router.navigate(['/login'])
      });

  }

  isLoggedIn() {
      if (localStorage.getItem('access_token') !== null){
        return true;
    }

  }


}

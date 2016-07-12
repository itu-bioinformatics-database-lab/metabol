import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import {AppSettings} from '../../../app/';

@Injectable()
export class LoginService {

  token: string;
  data2: string;
  options: RequestOptions;

  constructor(private http: Http) {
    this.token = localStorage.getItem('token');

    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
  }
  //Yeni post nasıl bulamadım
  login(Email: String, Password: String) {
    let postData = { Email: Email, Password: Password, grant_type: "password" };
    this.http
      .post(`${AppSettings.API_ENDPOINT}/token`, postData, this.options)
      .map(res => {
        console.log(res);
        return res.json();
      })
      .subscribe((data) => {
        console.log(data.token);
        this.token = data.token;
        localStorage.setItem('token', this.token);
      });
  }

  /*logout() {

      return this.http.get(this.config.serverUrl + '/auth/logout', {
          headers: new Headers({
              'x-security-token': this.token
          })
      })
          .map((res: any) => {
          this.token = undefined;
          localStorage.removeItem('token');
      });

  }*/


}

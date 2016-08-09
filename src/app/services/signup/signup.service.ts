import { Injectable } from '@angular/core';
import {Http, HTTP_PROVIDERS, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppSettings} from '../../../app/';
import {NotificationsService} from 'angular2-notifications'


@Injectable()
export class SignupService {
  headers: Headers;
  options: any;

  constructor(private http: Http, private notify: NotificationsService) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  signup(signupForm, callback: (data) => void) {
    let url = `${AppSettings.API_ENDPOINT}/account/Register`;
    this.http.post(url, signupForm, { headers: this.headers })
      .map((res) => res.json())
      .subscribe(
      data => callback(data),
      error => {
        if (error.status == 400) {
          let errorContent = error.json()
          for (let em in errorContent.modelState)
            for (let e of errorContent.modelState[em])
              this.notify.error(errorContent.message, e);
        }
      });
  }

}

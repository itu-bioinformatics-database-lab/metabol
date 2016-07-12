import { Injectable } from '@angular/core';
import {Http, HTTP_PROVIDERS, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppSettings} from '../../../app/';


@Injectable()
export class SignupService {
  headers: Headers;
  options: any;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  onSubmit(value) {
    // TODO: refactor this method what is on submit is not good naming
    return this.http.post(`${AppSettings.API_ENDPOINT}/account/Register`,
      JSON.stringify(value), { headers: this.headers })
  }

}

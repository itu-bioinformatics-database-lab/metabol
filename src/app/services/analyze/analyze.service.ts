import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {AppSettings} from '../../../app/';

@Injectable()
export class AnalyzeService {

  options: RequestOptions;

  constructor(private http: Http) {
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    });
  }

  getList(callback: (data) => void) {
    this.http.get(`${AppSettings.API_ENDPOINT}/fba/analysis/list`)
      .map(response => response.json())
      .subscribe(data => {
        callback(data)
      });
  }

  getDetail(key, callback: (data) => void) {


  }


}
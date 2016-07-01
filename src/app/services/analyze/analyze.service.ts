import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class AnalyzeService {

  apiUrl = "http://biodb.sehir.edu.tr/api2/fba/analysis/";
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
    this.http.get(this.apiUrl + "list")
      .map(response => response.json())
      .subscribe(data=> {
      callback(data)

    });
  }

  getDetail(key, callback: (data) => void) {


  }


}

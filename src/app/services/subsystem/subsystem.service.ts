import {LoadingService} from "../loading/loading.service";
import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {AppSettings} from '../../../app/';

@Injectable()
export class SubsystemService {

  constructor(private http: Http, private loading: LoadingService) { }

  all(callback: (data: string[]) => void) {
    this.loading.start();
    this.http.get(`${AppSettings.API_ENDPOINT}/subsystems`)
      .map(res => res.json()).subscribe(
      (data) => {
        callback(data);
        this.loading.finish();
      });
  }

  detail(id: string, callback: (data) => void) {
    this.loading.start();
    this.http.get(`${AppSettings.API_ENDPOINT}/subsystems/${id}`)
      .map(res => res.json()).subscribe(
      (data) => {
        callback(data);
        this.loading.finish();
      });
  }

}

import {Injectable} from '@angular/core'
import {Http, Headers, RequestOptions} from '@angular/http';
import {FbaIteration} from '../../models/fbaiteration';
import {MetaboliteConcentration} from '../../models/metaboliteConcentration';
import {AppSettings} from '../../../app/';
import {LoginService} from "../login/login.service";

@Injectable()
export class FbaService {
  apiUrl: String;

  currentIteration: number;
  key: String;
  fbas: Array<FbaIteration>;

  constructor(private http: Http, private login: LoginService) {
    this.apiUrl = `${AppSettings.API_ENDPOINT}/fba`;
    this.currentIteration = 0;
    this.fbas = new Array<FbaIteration>();
  }

  startFba(key?: string, callback?: () => void) {
    if (key)
      this.key = key;
    else
      this.http.get(`${this.apiUrl}/start`)
        .map(res => res.json()).subscribe(
        (data) => {
          this.key = data['key'];
          callback();
        });
  }

  getFbaKeyForData(data: Array<MetaboliteConcentration>, callback: (key: string) => void) {

    let postData = {
      "name": "Test name", // TODO: add name
      "concentrationChanges": data
    };

    this.http.post(`${this.apiUrl}/start`, postData, this.login.optionByAuthorization())
      .map((res) => res.json()).subscribe(
      (data) => {
        callback(data['key']);
      });
  }

  getNextIteration(callback: (key: FbaIteration) => void) {
    this.currentIteration++;

    this.http
      .get(`${this.apiUrl}/${this.key}/${this.currentIteration}`)
      .map(res => res.json()).subscribe(
      (data: FbaIteration) => {
        this.fbas.push(data);
        callback(data);
      });
  }

  save(callback: (response) => void) {
    // TODO: recheck response of api
    this.http.post(`${this.apiUrl}/save`, JSON.stringify(this.key), this.login.optionByAuthorization())
      .subscribe((response) => callback(response));
  }

}

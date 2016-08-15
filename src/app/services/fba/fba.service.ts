import {LoadingService} from "../loading/loading.service";
import {Injectable} from '@angular/core'
import {Http, Headers, RequestOptions} from '@angular/http';
import {FbaIteration} from '../../models/fbaiteration';
import {MetaboliteConcentration} from '../../models/metaboliteConcentration';
import {AppSettings} from '../../../app/';
import {LoginService} from "../login/login.service";
import {NotificationsService} from 'angular2-notifications';


@Injectable()
export class FbaService {
  apiUrl: String;

  currentIteration: number;
  key: String;
  fbas: Array<FbaIteration>;

  constructor(
    private http: Http,
    private login: LoginService,
    private notify: NotificationsService,
    private loading: LoadingService) {

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

  getFbaKeyForData(analyzeName: string, data: Array<MetaboliteConcentration>, callback: (key: string) => void) {

    let postData = {
      "name": analyzeName,
      "concentrationChanges": data
    };
    this.loading.start();
    this.http.post(`${this.apiUrl}/start`, postData, this.login.optionByAuthorization())
      .map((res) => res.json()).subscribe(
      (data) => {
        callback(data['key']);
        this.loading.finish();
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
    this.http.post(`${this.apiUrl}/save`, JSON.stringify(this.key), this.login.optionByAuthorization())
      .subscribe((response) => {
        callback(response);
        this.notify.success('Saved', 'You can review in control panel');
      });
  }

}

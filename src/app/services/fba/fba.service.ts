import {Injectable} from '@angular/core'
import {Http, Headers, RequestOptions} from '@angular/http';
import {FbaIteration} from './fbaiteration';
import {MetaboliteConcentration} from './metaboliteConcentration';


@Injectable()
export class FbaService {
  apiUrl = "http://biodb.sehir.edu.tr/api2/fba";
  currentIteration: number;
  key: String;
  fbas: Array<FbaIteration>;
  options: RequestOptions;

  constructor(private http: Http) {
    this.currentIteration = 0;
    this.fbas = new Array<FbaIteration>();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    });
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

    this.http.post(`${this.apiUrl}/start`, postData, this.options)
      .map((res) => res.json()).subscribe(
      (data) => {
        callback(data['key']);
      });
  }

  getNextIteration(callback: (key: FbaIteration) => void) {
    this.currentIteration++;

    this.http.get(`${this.apiUrl}/${this.key}/${this.currentIteration}`, this.options)
      .map(res => res.json()).subscribe(
      (data: FbaIteration) => {
        this.fbas.push(data);
        callback(data);
      });
  }

  save(callback: (key: string) => void) {
    // TODO: recheck response of api
    this.http.post(`${this.apiUrl}/save`, this.key, this.options)
      .map((res) => res.json())
      .subscribe((data) => callback(data));
  }

}

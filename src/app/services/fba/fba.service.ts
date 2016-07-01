import {Injectable} from '@angular/core'
import {Http, Headers, RequestOptions} from '@angular/http';
import {FbaIteration} from './fbaiteration';
import {MetaboliteConcentration} from './metaboliteConcentration';


@Injectable()
export class FbaService {
  apiUrl = "http://biodb.sehir.edu.tr/api2/fba/";
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
        'Access-Control-Allow-Origin':'*'
      })
    });
  }

  startFba(key?: string) {
    if (key)
      this.key = key;
    else
      this.http.get(this.apiUrl + 'start')
        .map(res => res.json()).subscribe(
        (data) => {
          this.key = data['key'];
        });
  }

  getFbaKeyForData(data: Array<MetaboliteConcentration>, callback: (key: string) => void) {
    let postData = {
      "Name": "Test name",
      "ConcentrationChanges": data
    };
    this.http.post(this.apiUrl + 'start', JSON.stringify(postData), this.options)
      .map((res) => res.json()).subscribe(
      (data) => {
        callback(data['key']);
      });
  }

  getNextIteration(callback: (key: FbaIteration) => void) {
    this.currentIteration++;
    this.http.get(this.apiUrl + this.key + '/' + this.currentIteration, this.options)
      .map(res => res.json()).subscribe(
      (data: FbaIteration) => {
        this.fbas.push(data);
        console.log(data);
        callback(data);
      });
  }

  save(callback: (key: string) => void) {
    this.http.post(this.apiUrl + 'save/', JSON.stringify(this.key), this.options)
      .map((res) => res.json())
      .subscribe((data) => callback(data));
  }
}

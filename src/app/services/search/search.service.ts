import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class SearchService {

  apiUrl: string;

  constructor(private http: Http) {
    this.apiUrl = 'http://biodb.sehir.edu.tr/api2';
  }

  searchPrefix(query: string)
    : Observable<{ reactions: String[]; metabolites: String[]; }> {
    return this.http.get(`${this.apiUrl}/searchprefix/${query}`)
      .map(response => response.json());
  }

  searchResult(query: string)
    : Observable<{
      reactions: Array<{ id: string; name: string; }>;
      metabolites: Array<{ id: string; name: string; }>;
    }> {
    return this.http.get(`${this.apiUrl}/search/${query}`)
      .map(response => response.json());
  }

}

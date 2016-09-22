import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppSettings} from '../../../app/';

@Injectable()
export class SearchService {

  constructor(private http: Http) { }

  searchPrefix(query: string)
    : Observable<{
      reactions: Array<{ id: string; name: string; }>;
      metabolites: Array<{ id: string; name: string; }>;
    }> {
    return this.http.get(`${AppSettings.API_ENDPOINT}/searchprefix/${query}`)
      .map(response => response.json());
  }

  searchResult(query: string)
    : Observable<{
      reactions: Array<{ id: string; name: string; }>;
      metabolites: Array<{ id: string; name: string; }>;
    }> {
    return this.http.get(`${AppSettings.API_ENDPOINT}/search/${query}`)
      .map(response => response.json());
  }

}

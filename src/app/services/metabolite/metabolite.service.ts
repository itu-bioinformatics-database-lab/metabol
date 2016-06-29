import {Metabolite, RelatedReactions} from './metabolite';
import {Injectable} from '@angular/core';
import {Http, HTTP_PROVIDERS, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MetaboliteService {
  metaboliteUrl: string;
  relatedReactionsUrl: string;

  constructor(private http: Http) {
    this.metaboliteUrl = 'http://biodb.sehir.edu.tr/api2/metabolite';
    this.relatedReactionsUrl = 'http://biodb.sehir.edu.tr/api2/relatedreactions';
  }

  getMetabolite(metaboliteId: string): Observable<Metabolite> {
    return this.http.get(`${this.metaboliteUrl}/${metaboliteId}`)
      .map(response => response.json());
  }

  getRelatedReactions(metaboliteId: string): Observable<RelatedReactions> {
    return this.http.get(`${this.relatedReactionsUrl }/${metaboliteId}`)
      .map(response => response.json());
  }

}

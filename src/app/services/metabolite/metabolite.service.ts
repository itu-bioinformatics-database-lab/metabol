import {Metabolite, RelatedReactions} from '../../models/metabolite';
import {Injectable} from '@angular/core';
import {Http, HTTP_PROVIDERS, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppSettings} from '../../../app/';

@Injectable()
export class MetaboliteService {

  constructor(private http: Http) { }

  getMetabolite(metaboliteId: string) {
    return this.http
      .get(`${AppSettings.API_ENDPOINT}/metabolite/${metaboliteId}`)
      .map(response => response.json());
  }

  getRelatedReactions(metaboliteId: string) {
    return this.http
      .get(`${AppSettings.API_ENDPOINT}/relatedreactions/${metaboliteId}`)
      .map(response => response.json());
  }

}

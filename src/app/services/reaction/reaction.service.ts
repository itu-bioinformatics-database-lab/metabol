import { Injectable } from '@angular/core';
import {Reaction, ConnectedMetabolites} from './reaction';
import {Http, HTTP_PROVIDERS, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class ReactionService {
  reactionUrl: string;
  relatedMetabolitesUrl: string;

  constructor(private http: Http) {
    this.reactionUrl = 'http://biodb.sehir.edu.tr/api2/reaction';
    this.relatedMetabolitesUrl = "http://biodb.sehir.edu.tr/api2/relatedmetabolites"
  }

  getReaction(reactionId: string) {
    return this.http.get(`${this.reactionUrl}/${reactionId}`)
      .map(response => response.json());

  }


  getRelatedMetabolites(reactionId: string) {
    return this.http.get(`${this.relatedMetabolitesUrl}/${reactionId}`)
      .map(response => response.json());
  }

}

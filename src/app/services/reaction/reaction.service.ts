import { Injectable } from '@angular/core';
import {Reaction, ConnectedMetabolites} from '../../models/reaction';
import {Http, HTTP_PROVIDERS, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppSettings} from '../../../app/';

@Injectable()
export class ReactionService {

  constructor(private http: Http) { }

  getReaction(reactionId: string) {
    return this.http
      .get(`${AppSettings.API_ENDPOINT}/reaction/${reactionId}`)
      .map(response => response.json());
  }

  getRelatedMetabolites(reactionId: string) {
    return this.http
      .get(`${AppSettings.API_ENDPOINT}/relatedmetabolites/${reactionId}`)
      .map(response => response.json());
  }

}

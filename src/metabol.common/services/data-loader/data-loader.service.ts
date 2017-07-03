import { Http } from '@angular/http';
import { Injectable } from "@angular/core";
import * as _ from 'lodash';

/**
 * Loader to load necessary data in to browser localStorage for future usage.
 */
@Injectable()
export class AppDataLoader {

  constructor(private http: Http) { }

  get(collection: string, callback: (data) => void) {
    // ToDo: set app version to setting and check if do not match then clean localStorage
    let localCol = localStorage.getItem(collection);
    if (localCol) callback(JSON.parse(localCol));
    else this.http.get(`assets/datasets/${collection}.json`)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem(collection, JSON.stringify(data));
        callback(data);
      });
  }

}

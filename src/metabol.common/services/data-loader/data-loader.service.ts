import {Http} from '@angular/http';
import {Injectable} from "@angular/core";
import * as _ from 'lodash';

/**
 * Loader to load necessary data in to browser localStorage for future usage.
 */
@Injectable()
export class AppDataLoader {

  constructor(private http: Http) { }

  /**
   * load call other loader methods
   */
  load(): void {
    this.loadCurrencyMetabolites();
    this.loadSubsystemNetwork();
    this.loadNetworkModel();
  }

  loadFile(filename, callback?: (data) => void) {
    if (!localStorage.getItem(filename))
      this.http.get(`assets/datasets/${filename}.json`)
        .map(res => res.json())
        .subscribe((data) => {
          if (callback != null) callback(data);
          localStorage.setItem(filename, JSON.stringify(data));
        });
  }

  get(collection: string) {
    return JSON.parse(localStorage.getItem(collection));
  }

  /**
   * load currency metabolite in currencyMetabolites.json
   */
  loadCurrencyMetabolites(): void {
    let collection = 'currency-metabolites';
    this.loadFile(collection);
  }

  /**
   * load currency metabolite in currencyMetabolites.json
   */
  loadNetworkModel(): void {
    let collection = 'recon2';

    this.loadFile(collection, (data) => {

      let reactionsDict: { [id: string]: any } = {};
      data.reactions.forEach(r => {
        r.formula = r.metabolites;
        r.metabolites = [];
        reactionsDict[r.id] = r;
      });
      data.reactions = reactionsDict;


      let metabolitesDict: { [id: string]: any } = {};
      data.metabolites.forEach(m => {
        m.formula = m.metabolites;
        m.reactions = [];
        metabolitesDict[m.id] = m;
      });
      data.metabolites = metabolitesDict;

    });
  }

  /**
   * load subsystem network in subsystem-network.json
   */
  loadSubsystemNetwork(): void {
    let collection = 'subsystem-network';
    this.loadFile(collection);
  }

}

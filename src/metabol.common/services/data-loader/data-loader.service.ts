import {Http} from '@angular/http';
import {Injectable} from "@angular/core";

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
  }

  loadFile(filename) {
    if (!localStorage.getItem(filename))
      this.http.get(`assets/datasets/${filename}.json`)
        .map(res => res.json())
        .subscribe((data) => {
          localStorage.setItem(filename, JSON.stringify(data));
        });
  }

  /**
   * load currency metabolite in currencyMetabolites.json
   */
  loadCurrencyMetabolites(): void {
    let collection = 'currency-metabolites';
    this.loadFile(collection);
  }

  /**
   * load subsystem network in subsystem-network.json
   */
  loadSubsystemNetwork(): void {
    let collection = 'subsystem-network';
    this.loadFile(collection);
  }

}

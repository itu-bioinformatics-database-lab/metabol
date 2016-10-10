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
  }

  /**
   * load currency metabolite in currencyMetabolites.json
   */
  loadCurrencyMetabolites(): void {
    let collection = 'currency-metabolites';

    if (!localStorage.getItem(collection))
      this.http.get('assets/datasets/currency-metabolites.json')
        .map(res => res.json())
        .subscribe((data) => {
          localStorage.setItem(collection, JSON.stringify(data));
        });
  }

}

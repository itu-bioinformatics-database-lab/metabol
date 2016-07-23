/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { CurrencyMetabolitesService } from './currency-metabolites.service';

describe('CurrencyMetabolites Service', () => {
  let currencyMetabolitesService: CurrencyMetabolitesService;

  let localStoreData = {
    "2hb[c]": "",
    "2hb[e]": "",
    "h[c]": ""
  };

  beforeEachProviders(() => [CurrencyMetabolitesService]);

  beforeAll(function() {
    localStorage.clear();
    localStorage.setItem('currency-metabolites', JSON.stringify(localStoreData));
  });

  beforeEach(inject([CurrencyMetabolitesService], (c) => {
    currencyMetabolitesService = c;
  }));

  it('should correctly initialized', () => {
    expect(currencyMetabolitesService.currencyMetabolites).not.toBeNull();
  });

  it('should isCurrecyMetabolite', () => {
    expect(currencyMetabolitesService.isCurrency('h[c]')).toBeTruthy();
    expect(currencyMetabolitesService.isCurrency('2hb[e]')).toBeTruthy();
    expect(currencyMetabolitesService.isCurrency('nocurrency')).not.toBeTruthy();
  });

  afterAll(() => {
    localStorage.clear();
  });

});

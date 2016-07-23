/* tslint:disable:no-unused-variable */

import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  async,
  inject
} from '@angular/core/testing';

import {AppDataLoader} from './appDataLoader';
import {provide} from '@angular/core';

import {
  Http,
  HTTP_PROVIDERS,
  Response,
  ResponseOptions,
  BaseRequestOptions
} from '@angular/http';

import {MockBackend, MockConnection} from '@angular/http/testing';

describe('Search Service', () => {
  let appDataLoader: AppDataLoader;
  let mockBackend: MockBackend;

  let apiData = {
    "2hb[c]": "",
    "2hb[e]": "",
    "h[c]": ""
  };

  let getCurrencyMetabolites = () =>
    JSON.parse(localStorage.getItem('currency-metabolites'));

  const mockHttpProvider = {
    deps: [MockBackend, BaseRequestOptions],
    useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
      return new Http(backend, defaultOptions);
    }
  }

  beforeEachProviders(() => [
    MockBackend,
    BaseRequestOptions,
    provide(Http, mockHttpProvider),
    AppDataLoader
  ]);

  beforeEach(inject([AppDataLoader, MockBackend], (l, m) => {
    appDataLoader = l;
    mockBackend = m;

    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        let options = new ResponseOptions({ body: apiData });
        connection.mockRespond(new Response(options));
        expect(connection.request.url).toEqual('currencyMetabolites.json');
      });

    localStorage.clear();
  }));

  it('should loadCurrencyMetabolites', async(() => {
    appDataLoader.loadCurrencyMetabolites();
    expect(getCurrencyMetabolites()).toEqual(apiData);
  }));

  it('should load', async(() => {
    appDataLoader.load();
    expect(getCurrencyMetabolites()).toEqual(apiData);
  }));

  afterEach(() => {
    localStorage.clear();
  });

});

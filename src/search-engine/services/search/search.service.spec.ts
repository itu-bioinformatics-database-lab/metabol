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

import { SearchService } from './search.service';
import {provide} from '@angular/core';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {AppSettings} from '../../../app/';

import {
  Http,
  HTTP_PROVIDERS,
  Response,
  ResponseOptions,
  BaseRequestOptions
} from '@angular/http';

describe('Search Service', () => {
  let searchService: SearchService;
  let mockBackend: MockBackend;
  let query = 'pro';

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
    SearchService
  ]);

  beforeEach(inject([SearchService, MockBackend], (s, m) => {
    searchService = s;
    mockBackend = m;
  }));

  it('should response search prefix', async(() => {

    let apiData = {
      reactions: [
        { id: "a", name: "a1" },
        { id: "b", name: "b1" },
        { id: "c", name: "c1" }
      ],
      metabolites: [
        { id: "x", name: "x1" },
        { id: "y", name: "y1" },
        { id: "z", name: "z1" }
      ],
    };

    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        let options = new ResponseOptions({ body: apiData });
        connection.mockRespond(new Response(options));

        let expectedUrl = `${AppSettings.API_ENDPOINT}/searchprefix/${query}`;
        expect(connection.request.url).toEqual(expectedUrl);
      });

    searchService.searchPrefix(query).subscribe((data) => {
      expect(data.reactions).toEqual(apiData.reactions);
      expect(data.metabolites).toEqual(apiData.metabolites);
    });

  }));

  it('should response search', async(() => {

    let apiData = {
      reactions: [
        { id: "a", name: "a1" },
        { id: "b", name: "b1" },
        { id: "c", name: "c1" }
      ],
      metabolites: [
        { id: "x", name: "x1" },
        { id: "y", name: "y1" },
        { id: "z", name: "z1" }
      ],
    };

    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        let options = new ResponseOptions({ body: apiData });
        connection.mockRespond(new Response(options));

        let expectedUrl = `${AppSettings.API_ENDPOINT}/search/${query}`;
        expect(connection.request.url).toEqual(expectedUrl);
      });

    searchService.searchResult(query).subscribe((data) => {
      expect(data.reactions).toEqual(apiData.reactions);
      expect(data.metabolites).toEqual(apiData.metabolites);
    });

  }));

});

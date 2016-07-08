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

import { FbaService } from './fba.service';
import {provide} from '@angular/core';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {MetaboliteConcentration} from './metaboliteConcentration';
import {FbaIteration, FbaNode, FbaLink} from './fbaiteration';

import {
  Http,
  HTTP_PROVIDERS,
  Response,
  ResponseOptions,
  BaseRequestOptions
} from '@angular/http';

describe('Fba Service', () => {
  let fbaService: FbaService;
  let mockBackend: MockBackend;
  let guid = '4d0d58dd-18ba-496b-98b9-6b93906625e8';

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
    FbaService
  ]);

  beforeEach(inject([FbaService, MockBackend], (s, m) => {
    fbaService = s;
    mockBackend = m;
  }));

  it('should start fba analyze without key', async(() => {

    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        let options = new ResponseOptions({ body: { key: guid } });
        connection.mockRespond(new Response(options));

        let expectedUrl = `http://biodb.sehir.edu.tr/api2/fba/start`;
        expect(connection.request.url).toEqual(expectedUrl);
      });

    fbaService.startFba(undefined, () => {
      expect(fbaService.key).toEqual(guid);
    });

  }));

  it('should start fba analyze with key', async(() => {

    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(new ResponseOptions()));
        fail('It should not make request');
      });

    fbaService.startFba(guid);
    expect(fbaService.key).toEqual(guid);

  }));


  it('should give fba key', async(() => {

    let apiData = [
      { name: 'a', change: 1, exactValue: undefined },
      { name: 'b', change: 2, exactValue: undefined },
    ];

    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        let options = new ResponseOptions({ body: { key: guid } });
        connection.mockRespond(new Response(options));

        let body = JSON.parse(connection.request.json());
        expect(body).toBeDefined();

        expect(body.concentrationChanges.length).toEqual(apiData.length);

        let expectedUrl = `http://biodb.sehir.edu.tr/api2/fba/start`;
        expect(connection.request.url).toEqual(expectedUrl);
      });

    fbaService.getFbaKeyForData(apiData, (data) => {
      expect(data).toEqual(guid);
    });

  }));

  it('should give next iteration', async(() => {

    let apiData: FbaIteration = {
      id: 'a',
      fba: 1,
      time: 1,
      constraints: ['c1', 'c2'],
      fluxes: [[1, 2], [1, 2]],
      nodes: new Array<FbaNode>(),
      links: new Array<FbaLink>()
    };

    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        let options = new ResponseOptions({ body: apiData });
        connection.mockRespond(new Response(options));

        let expectedUrl = `http://biodb.sehir.edu.tr/api2/fba/${fbaService.key}/${fbaService.currentIteration}`;
        expect(connection.request.url).toEqual(expectedUrl);
      });

    fbaService.getNextIteration((data) => {
      expect(data).toEqual(apiData);
    });

  }));

  it('should save iterations', async(() => {

    fbaService.startFba(guid);

    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        let options = new ResponseOptions({ body: { key: guid } });
        connection.mockRespond(new Response(options));

        let expectedUrl = `http://biodb.sehir.edu.tr/api2/fba/save`;
        expect(connection.request.url).toEqual(expectedUrl);
      });

    fbaService.save((data) => {
      expect(data).toBeDefined();
    });

  }));

});

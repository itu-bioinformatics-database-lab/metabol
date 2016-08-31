/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { SubsystemAnalyzeService } from './subsystem-analyze.service';

import {provide} from '@angular/core';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {MetaboliteConcentration} from '../../models/metaboliteConcentration';
import {LoginService} from "../login/login.service";
import {LoginTestingService} from "../login/login.testing";
import { APP_ROUTER_PROVIDERS, AppComponent, environment } from '../../../app';

import {
  Http,
  HTTP_PROVIDERS,
  Response,
  ResponseOptions,
  BaseRequestOptions,
} from '@angular/http';

import {AppSettings} from '../../../app/';


import {SubsystemTreeNode} from "../../models/subsystem";

describe('SubsystemAnalyze Service', () => {

  let service: SubsystemAnalyzeService;
  let mockBackend: MockBackend;

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
    APP_ROUTER_PROVIDERS,
    provide(LoginService, { useClass: LoginTestingService }),
    SubsystemAnalyzeService
  ]);

  beforeEach(inject([SubsystemAnalyzeService, MockBackend], (s, m) => {
    service = s;
    mockBackend = m;
  }));

  let responseData: { [solution: string]: Set<string> } = {
    "solution-1": new Set(["pathway-1", "pathway-2", "pathway-3"]),
    "solution-2": new Set(["pathway-1", "pathway-2"]),
    "solution-3": new Set(["pathway-1", "pathway-3"]),
    "solution-4": new Set(["pathway-2", "pathway-4"])
  };

  it('should ...', () => {
    expect(service).toBeTruthy();
  });

  it('should get solutions', async(() => {

    let apiData = [
      { name: 'a', change: 1, exactValue: undefined },
      { name: 'b', change: 2, exactValue: undefined },
    ];

    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        let options = new ResponseOptions({ body: responseData });
        connection.mockRespond(new Response(options));

        let body = JSON.parse(connection.request.json());
        expect(body).toBeDefined();
        console.log(body);
        expect(body.concentrationChanges.length).toEqual(apiData.length);

        let expectedUrl = `${AppSettings.API_ENDPOINT}/subsystems-analyze`;
        expect(connection.request.url).toEqual(expectedUrl);
      });

    service.getSolutions("analyze name", apiData, (data) => {
      expect(data).toEqual(responseData);
    });

  }));

  let pathwayData: { [solution: string]: Set<string> } = {
    "pathway-1": new Set(["solution-1", "solution-2", "solution-3"]),
    "pathway-2": new Set(["solution-1", "solution-2"]),
    "pathway-3": new Set(["solution-1", "solution-3"]),
    "pathway-4": new Set(["solution-4"]),
  };

  it('should reverseDict', () => {
    expect(service.reverseDict(responseData)).toEqual(pathwayData);
    let reverseOfReverse = service.reverseDict(service.reverseDict(responseData));
    expect(reverseOfReverse).toEqual(responseData);
  });

  it('should select most active pathway', () => {
    expect(service.mostActivePathway(pathwayData)).toEqual("pathway-1");
  });

  it('should find intersection and nonintersection', () => {

    let intersection: { [solution: string]: Set<string> } = {
      "pathway-2": new Set(["solution-1", "solution-2"]),
      "pathway-3": new Set(["solution-1", "solution-3"]),
    };

    let nonintersection: { [solution: string]: Set<string> } = {
      "pathway-4": new Set(["solution-4"]),
    };

    let expectIntersection = service.pathwayIntersection("pathway-1", pathwayData);

    expect(expectIntersection).toEqual([intersection, nonintersection]);
  });

  it('should create subsystem solution tree', () => {
    let solutionTree: SubsystemTreeNode = {
      name: "All",
      children: [
        <SubsystemTreeNode>{
          name: "p1"
        },
        <SubsystemTreeNode>{
          name: "p1"
        },
      ]
    };

    expect().toEqual();
  });

});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import {CurrencyMetabolitesService} from "../../../metabol.common/services/";
import { AllNetworkVisualizationService } from './all-network-visualization.service';

describe('Service: AllNetworkVisualization', () => {
  let service: AllNetworkVisualizationService;

  let localStoreData = [
    {
      "subsystemSource": "s1",
      "subsystemTarget": "s2",
      "borderMetaboliteId": "m1",
      "borderMetaboliteName": "m1"
    }, {
      "subsystemSource": "s2",
      "subsystemTarget": "s3",
      "borderMetaboliteId": "m2",
      "borderMetaboliteName": "m2"
    }, {
      "subsystemSource": "s3",
      "subsystemTarget": "s1",
      "borderMetaboliteId": "m3",
      "borderMetaboliteName": "m3"
    }
  ];

  let expectedNodes = [
    { name: 's1', type: 'sub', reactions: [] },
    { name: 's2', type: 'sub', reactions: [] },
    { name: 's3', type: 'sub', reactions: [] },
    { name: 'm1', type: 'm' },
    { name: 'm2', type: 'm' },
    { name: 'm3', type: 'm' },
  ];

  let expectedLinks = [
    {
      source: expectedNodes[0],
      target: expectedNodes[3],
      role: 'sub'
    },
    {
      source: expectedNodes[1],
      target: expectedNodes[3],
      role: 'sub'
    },
    {
      source: expectedNodes[1],
      target: expectedNodes[4],
      role: 'sub'
    },
    {
      source: expectedNodes[2],
      target: expectedNodes[4],
      role: 'sub'
    },
    {
      source: expectedNodes[2],
      target: expectedNodes[5],
      role: 'sub'
    },
    {
      source: expectedNodes[0],
      target: expectedNodes[5],
      role: 'sub'
    },
  ];

  beforeAll(function() {
    localStorage.clear();
    localStorage.setItem('subsystem-network', JSON.stringify(localStoreData));
    localStorage.setItem('currency-metabolites', JSON.stringify({}));
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllNetworkVisualizationService, CurrencyMetabolitesService]
    });

    service = TestBed.get(AllNetworkVisualizationService);
  });

  it('should ...', () => {
    expect(service).toBeTruthy();
  });

  it('should create nodes', () => {
    service.load();
    let nodes = service.get()[0];

    for (let i = 0; i < expectedNodes.length; i++) {
      expect(nodes[i]).toEqual(expectedNodes[i]);
    }
  });

  it('should create links', () => {
    service.load();
    let links = service.get()[1];

    for (let i = 0; i < expectedLinks.length; i++) {
      expect(links[i]).toEqual(expectedLinks[i]);
    }
  });

  afterAll(() => {
    localStorage.clear();
  });

});

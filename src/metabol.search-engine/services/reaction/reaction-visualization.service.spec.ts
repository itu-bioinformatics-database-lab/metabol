/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import {provide} from '@angular/core';
import { Injectable } from '@angular/core';

import { ReactionVisualizationService } from './reaction-visualization.service';
import {Reaction, ConnectedMetabolites, ConnectedMetabolite} from '../../models/reaction';
import {Metabolite} from '../../models/metabolite';
import {FbaNode, FbaLink} from '../../../visualizations/models';
import {CurrencyMetabolitesService} from '../../../common/services';

/**
 * Wrost test i ever write but dependcy injection of service to service not working
 */

describe('ReactionVisualization Service', () => {

  beforeEachProviders(() => [
    ReactionVisualizationService
  ]);

  let localStoreData = {
    "2hb[c]": "",
    "2hb[e]": "",
    "h[c]": ""
  };

  /**
   * Bad hacking beacuse dependcy injection not working
   */
  beforeAll(function() {
    localStorage.clear();
    localStorage.setItem('currency-metabolites', JSON.stringify(localStoreData));
  });

  let service: ReactionVisualizationService;
  beforeEach(inject([ReactionVisualizationService], (rv) => {
    service = rv;
  }));

  let reaction = <Reaction>{ id: 'r1' };
  let connectedMetabolites: ConnectedMetabolite[] = [
    <ConnectedMetabolite>{
      id: 'm1', stoichiometry: 1,
      reactions: [{ id: "r2", stoichiometry: 1 }, { id: "r4", stoichiometry: -1 }]
    },
    <ConnectedMetabolite>{
      id: 'h[c]', stoichiometry: 2,
      reactions: [{ id: "r3", stoichiometry: -1 }]
    },
    <ConnectedMetabolite>{
      id: 'm3', stoichiometry: -1,
      reactions: []
    },
  ];

  let expectedFbaNode: FbaNode[] = [
    { id: 0, name: 'r1', type: 'r', index: 0, color: '#003fff' },
    { id: 1, name: 'm1', type: 'm', index: 0, color: '#ff0000' },
    { id: 2, name: 'h[c]', type: 'm', index: 0, color: '#7fff00' },
    { id: 3, name: 'm3', type: 'm', index: 0, color: '#7fff00' },
    { id: 4, name: 'r2', type: 'r', index: 0, color: '#999' },
    { id: 5, name: 'r4', type: 'r', index: 0, color: '#999' }
  ];

  let expectedFbaLink: FbaLink[] = [
    { source: 1, target: 0, role: 's', stoichiometry: 1 },
    { source: 2, target: 0, role: 's', stoichiometry: 2 },
    { source: 0, target: 3, role: 'p', stoichiometry: -1 },
    { source: 4, target: 1, role: 'p', stoichiometry: -1 },
    { source: 1, target: 5, role: 's', stoichiometry: 1 }
  ];

  it('should ...', () => {
    expect(service).toBeTruthy();
  });

  it('should convertToFbaNode', () => {
    let fbaNodes = service.convertToFbaNode(reaction, connectedMetabolites);
    expect(fbaNodes).toEqual(expectedFbaNode);
  });

  it('should convertToFbaLink', () => {
    let fbaLinks = service.convertToFbaLink(reaction, connectedMetabolites);
    expect(fbaLinks).toEqual(expectedFbaLink);
  });

  it('should convertToFbaVisualization', () => {
    let fbaVisualization = service.convertToFbaVisualization(reaction, connectedMetabolites);
    expect(fbaVisualization).toEqual([expectedFbaNode, expectedFbaLink]);
  });

  afterAll(() => {
    localStorage.clear();
  });

});

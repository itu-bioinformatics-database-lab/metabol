/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import {provide} from '@angular/core';
import { Injectable } from '@angular/core';

import { MetaboliteVisualizationService} from './metabolite-visualization.service';
import {Reaction, ConnectedMetabolites, ConnectedMetabolite} from '../../models/reaction';
import {FbaNode, FbaLink} from '../../../visualizations/models';
import {Metabolite, RelatedReactions} from '../../models/metabolite';

/**
 * Wrost test i ever write but dependcy injection of service to service not working
 */

describe('ReactionVisualization Service', () => {

  // console.log(mockCurrencyMetabolitesService);

  beforeEachProviders(() => [
    MetaboliteVisualizationService
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

  let service: MetaboliteVisualizationService;
  beforeEach(inject([MetaboliteVisualizationService], (rv) => {
    service = rv;
  }));

  let metabolite = <Metabolite>{ id: 'm1' };
  let relatedReactions = [
    {
      id: 'r1', stoichiometry: 1,
      metabolites: [{ id: "m2", stoichiometry: 1 }, { id: "m3", stoichiometry: -1 }]
    },
    {
      id: 'r2', stoichiometry: 1,
      metabolites: [{ id: "m4", stoichiometry: -1 }]
    },
    {
      id: 'r3', stoichiometry: -1,
      metabolites: []
    },
  ];

  let expectedFbaNode: FbaNode[] = [
    { id: 0, name: 'm1', type: 'm', index: 0, color: '#003fff' },
    { id: 1, name: 'r1', type: 'r', index: 0, color: '#7fff00' },
    { id: 2, name: 'r2', type: 'r', index: 0, color: '#7fff00' },
    { id: 3, name: 'r3', type: 'r', index: 0, color: '#ff0000' },
    { id: 4, name: 'm2', type: 'm', index: 0, color: '#999' },
    { id: 5, name: 'm3', type: 'm', index: 0, color: '#999' },
    { id: 6, name: 'm4', type: 'm', index: 0, color: '#999' }
  ];

  let expectedFbaLink: FbaLink[] = [
    { source: 0, target: 1, role: 's', stoichiometry: 1 },
    { source: 0, target: 2, role: 's', stoichiometry: 1 },
    { source: 3, target: 0, role: 'p', stoichiometry: -1 },
    { source: 4, target: 1, role: 's', stoichiometry: 1 },
    { source: 1, target: 5, role: 'p', stoichiometry: -1 },
    { source: 2, target: 6, role: 'p', stoichiometry: -1 }
  ];

  it('should ...', () => {
    expect(service).toBeTruthy();
  });

  it('should convertToFbaNode', () => {
    let fbaNodes = service.convertToFbaNode(metabolite, relatedReactions);
    expect(fbaNodes).toEqual(expectedFbaNode);
  });

  it('should convertToFbaLink', () => {
    let fbaLinks = service.convertToFbaLink(metabolite, relatedReactions);
    expect(fbaLinks).toEqual(expectedFbaLink);
  });

  it('should convertToFbaVisualization', () => {
    let fbaVisualization = service.convertToFbaVisualization(metabolite, relatedReactions);
    expect(fbaVisualization).toEqual([expectedFbaNode, expectedFbaLink]);
  });

  afterAll(() => {
    localStorage.clear();
  });

});

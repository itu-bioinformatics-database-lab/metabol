/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import {FbaNode, FbaLink} from '../../models';
import {RelatedMetabolite, RelatedReaction, Metabolite} from '../../../metabol.search-engine/models';

import { RelatedToVisualizationService } from './related-to-visualization.service';

describe('RelatedToVisualization Service', () => {

  let service: RelatedToVisualizationService;

  let localStoreData = {
    'h[c]': '',
    'm1': ''
  };

  /**
   * Bad hacking beacuse dependcy injection not working
   */
  beforeAll(function() {
    localStorage.clear();
    localStorage.setItem('currency-metabolites', JSON.stringify(localStoreData));
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RelatedToVisualizationService,
      ]
    });

    service = TestBed.get(RelatedToVisualizationService);

  });

  it('should ...', () => {
    expect(service).toBeTruthy();
  });

  let relatedMetabolites: RelatedMetabolite =
    <RelatedMetabolite>{
      id: 'm1', name: 'm1', stoichiometry: 1,
      reactions: [
        { id: "r2", name: 'r2', stoichiometry: 1, subsystem: 's1' },
        {
          id: "r4", name: 'r4', stoichiometry: -1, subsystem: 's2',
          metabolites: [
            <RelatedMetabolite>{
              id: 'h[c]', name: 'h[c]', stoichiometry: 2,
              reactions: [{ id: "r3", name: 'r3', stoichiometry: -1 }]
            },
            <RelatedMetabolite>{
              id: 'm3', name: 'm3', stoichiometry: -1,
              reactions: [
                { id: 'r5', name: 'r5', subsystem: 's3' }
              ]
            }
          ]
        }
      ]
    };



  it('visual related reactions', () => {

    let expectedNodes = [
      { name: 's1', type: 'sub', reactions: [{ name: 'r2', type: 'r' }] },
      { name: 's2', type: 'sub', reactions: [{ name: 'r4', type: 'r' }] },
      { name: 's3', type: 'sub', reactions: [{ name: 'r5', type: 'r' }] },
      { name: 'm1', type: 'm' },
      { name: 'h[c]', type: 'm' },
      { name: 'm3', type: 'm' },
      { name: 'r2', type: 'r' },
      { name: 'r4', type: 'r' },
      { name: 'r5', type: 'r' },
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
        source: { name: 'r2', type: 'r' },
        target: { name: 'm1', type: 'm' },
        role: 'p', stoichiometry: 1
      },
      {
        source: { name: 'r4', type: 'r' },
        target: { name: 'm1', type: 'm' },
        role: 'p', stoichiometry: 1
      },
      {
        source: { name: 'r4', type: 'r' },
        target: { name: 'h[c]', type: 'm' },
        role: 'p', stoichiometry: 2
      },
      {
        source: { name: 'm3', type: 'm' },
        target: { name: 'r4', type: 'r' },
        role: 's', stoichiometry: -1
      },
      {
        source: expectedNodes[2],
        target: { name: 'm3', type: 'm' },
        role: 'sub'
      },
      {
        source: { name: 'm3', type: 'm' },
        target: { name: 'r5', type: 'r' },
        role: 's', stoichiometry: -1
      },
    ];

    let visual = service.visualizeRelatedMetabolites(relatedMetabolites);

    expect(expectedNodes.length).toEqual(visual[0].length);
    expect(expectedLinks.length).toEqual(visual[1].length);

    for (let i = 0; i < expectedNodes.length; i++) {
      expect(expectedNodes[i]).toEqual(visual[0][i]);
    }

    for (let i = 0; i < expectedLinks.length; i++) {
      expect(expectedLinks[i]).toEqual(visual[1][i]);
    }

  });

  afterAll(() => {
    localStorage.clear();
  });

});

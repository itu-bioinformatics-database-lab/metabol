/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import {FbaNode, FbaLink} from '../../models';
import {RelatedMetabolite, RelatedReaction, Metabolite} from '../../../metabol.search-engine/models';

import { RelatedToVisualizationService } from './related-to-visualization.service';

describe('RelatedToVisualization Service', () => {

  let service: RelatedToVisualizationService;

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

  let relatedMetabolites: RelatedMetabolite[] = [
    <RelatedMetabolite>{
      id: 'm1', name: 'm1', stoichiometry: 1,
      reactions: [
        { id: "r2", name: 'r2', stoichiometry: 1 },
        { id: "r4", name: 'r4', stoichiometry: -1 }]
    },
    <RelatedMetabolite>{
      id: 'h[c]', name: 'h[c]', stoichiometry: 2,
      reactions: [{ id: "r3", name: 'r3', stoichiometry: -1 }]
    },
    <RelatedMetabolite>{
      id: 'm3', name: 'm3', stoichiometry: -1,
      reactions: []
    },
  ];



  it('visual related reactions', () => {

    let expectedVisual = [
      [
        { name: 'm1', type: 'm' },
        { name: 'r2', type: 'r' },
        { name: 'r4', type: 'r' }
      ],
      [
        {
          source: { name: 'r2', type: 'r' },
          target: { name: 'm1', type: 'm' },
          role: 'p', stoichiometry: 1
        },
        {
          source: { name: 'r4', type: 'r' },
          target: { name: 'm1', type: 'm' },
          role: 'p', stoichiometry: 1
        }
      ]
    ];

    let visual = service.visualizeRelatedMetabolites(relatedMetabolites[0]);
    expect(expectedVisual).toEqual(visual);
  });

});

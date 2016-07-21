/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { ReactionVisualizationService } from './reaction-visualization.service';
import {Reaction, ConnectedMetabolites, ConnectedMetabolite} from '../../models/reaction';
import {Metabolite} from '../../models/metabolite';
import {FbaNode, FbaLink} from '../../models/fbaiteration';

describe('ReactionVisualization Service', () => {
  beforeEachProviders(() => [ReactionVisualizationService]);

  let reaction = <Reaction>{ id: 'r' };
  let connectedMetabolites: ConnectedMetabolite[] = [
      <ConnectedMetabolite>{ id: 'a', stoichiometry: 1 },
      <ConnectedMetabolite>{ id: 'b', stoichiometry: 2 },
      <ConnectedMetabolite>{ id: 'c', stoichiometry: -1 },
  ];

  let expectedFbaNode: FbaNode[] = [
    { id: 0, name: 'a', type: 'm', index: 0, color:'#ff0000' },
    { id: 1, name: 'b', type: 'm', index: 0, color:'#7fff00' },
    { id: 2, name: 'c', type: 'm', index: 0, color:'#00ffff' },
    { id: 3, name: 'r', type: 'r', index: 0, color:'#7f00ff' }
  ];

  let expectedFbaLink: FbaLink[] = [
    { source: 0, target: 3, role: 's' },
    { source: 1, target: 3, role: 's' },
    { source: 3, target: 2, role: 'p' }
  ];

  it('should ...',
    inject([ReactionVisualizationService], (service: ReactionVisualizationService) => {
      expect(service).toBeTruthy();
    }));

  it('should convertToFbaNode',
    inject([ReactionVisualizationService], (service: ReactionVisualizationService) => {
      let fbaNodes = service.convertToFbaNode(reaction, connectedMetabolites);
      expect(fbaNodes).toEqual(expectedFbaNode);
    }));

  it('should convertToFbaLink',
    inject([ReactionVisualizationService], (service: ReactionVisualizationService) => {
      let fbaLinks = service.convertToFbaLink(reaction, connectedMetabolites);
      expect(fbaLinks).toEqual(expectedFbaLink);
    }));

  it('should convertToFbaVisualization',
    inject([ReactionVisualizationService], (service: ReactionVisualizationService) => {
      let fbaVisualization = service.convertToFbaVisualization(reaction, connectedMetabolites);
      expect(fbaVisualization).toEqual([expectedFbaNode, expectedFbaLink]);
    }));

});

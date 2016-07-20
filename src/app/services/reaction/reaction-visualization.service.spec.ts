/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { ReactionVisualizationService } from './reaction-visualization.service';

describe('ReactionVisualization Service', () => {
  beforeEachProviders(() => [ReactionVisualizationService]);

  it('should ...',
      inject([ReactionVisualizationService], (service: ReactionVisualizationService) => {
    expect(service).toBeTruthy();
  }));
});

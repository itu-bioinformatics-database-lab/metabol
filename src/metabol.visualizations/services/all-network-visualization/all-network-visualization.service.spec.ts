/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AllNetworkVisualizationService } from './all-network-visualization.service';

describe('Service: AllNetworkVisualization', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllNetworkVisualizationService]
    });
  });

  it('should ...', inject([AllNetworkVisualizationService], (service: AllNetworkVisualizationService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { SearchService } from './search.service';

describe('Search Service', () => {
  beforeEachProviders(() => [SearchService]);

  it('should ...',
    inject([SearchService], (service: SearchService) => {
      expect(service).toBeTruthy();
    }));
});

/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('Loading Service', () => {
  beforeEachProviders(() => [LoadingService]);

  it('should ...',
      inject([LoadingService], (service: LoadingService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { FbaService } from './fba.service';

describe('Fba Service', () => {
  beforeEachProviders(() => [FbaService]);

  it('should ...',
      inject([FbaService], (service: FbaService) => {
    expect(service).toBeTruthy();
  }));
});

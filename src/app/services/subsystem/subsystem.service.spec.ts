/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { SubsystemService } from './subsystem.service';

describe('Subsystem Service', () => {
  beforeEachProviders(() => [SubsystemService]);

  it('should ...',
      inject([SubsystemService], (service: SubsystemService) => {
    expect(service).toBeTruthy();
  }));
});

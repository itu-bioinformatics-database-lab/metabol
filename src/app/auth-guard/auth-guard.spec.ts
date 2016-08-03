/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { AuthGuard } from './auth-guard';

describe('AuthGuard Service', () => {
  beforeEachProviders(() => [AuthGuard]);

  it('should ...',
    inject([AuthGuard], (service: AuthGuard) => {
      expect(service).toBeTruthy();
    }));
});

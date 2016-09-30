/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('Loading Service', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService]
    });
  });

  it('should ...',
      inject([LoadingService], (service: LoadingService) => {
    expect(service).toBeTruthy();
  }));

});

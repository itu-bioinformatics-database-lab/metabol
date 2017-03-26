/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EscherService } from './escher.service';

describe('Service: Escher', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EscherService]
    });
  });

  it('should ...', inject([EscherService], (service: EscherService) => {
    expect(service).toBeTruthy();
  }));
});

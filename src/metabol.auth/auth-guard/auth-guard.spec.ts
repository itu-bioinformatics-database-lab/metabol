/* tslint:disable:no-unused-variable */

import { AuthGuard } from './auth-guard';
import { TestBed, async, inject } from '@angular/core/testing';
import { Router }    from '@angular/router';

class RouterStub {
  navigate(url: string) { return url; }
}

describe('AuthGuard Service', () => {
  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useClass: RouterStub }
      ]
    });
  });

  beforeEach(inject([AuthGuard], (ag) => {
    service = ag;
  }));

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should password incorrect', () => {
    localStorage.removeItem('access_token');
    expect(service.canActivate()).not.toBeTruthy();
  });

  it('should password incorrect', () => {
    localStorage.setItem('access_token', 'not_null');
    expect(service.canActivate()).toBeTruthy();
  });

  afterAll(() => {
    localStorage.clear();
  });

});

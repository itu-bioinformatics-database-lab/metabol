/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { AuthGuard } from './auth-guard';
import {provide, Type} from '@angular/core';
import {Router} from '@angular/router'

// TODO: Test navigation too   
class MockRouter {
  navigate(commands: any[]) { }
}

describe('AuthGuard Service', () => {
  let service;

  beforeEachProviders(() => [
    provide(Router, { useClass: MockRouter }),
    AuthGuard
  ]);

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
    localStorage.setItem('access_token','not_null');
    expect(service.canActivate()).toBeTruthy();
  });

  afterAll(() => {
    localStorage.clear();
  });

});

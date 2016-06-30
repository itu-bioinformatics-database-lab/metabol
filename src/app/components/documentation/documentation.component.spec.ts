/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { DocumentationComponent } from './documentation.component';

describe('Component: Documentation', () => {
  it('should create an instance', () => {
    let component = new DocumentationComponent();
    expect(component).toBeTruthy();
  });
});

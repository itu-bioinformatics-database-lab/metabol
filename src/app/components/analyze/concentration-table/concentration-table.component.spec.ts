/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { ConcentrationTableComponent } from './concentration-table.component';

describe('Component: ConcentrationTable', () => {
  it('should create an instance', () => {
    let component = new ConcentrationTableComponent();
    expect(component).toBeTruthy();
  });
});

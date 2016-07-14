/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { FullScreenableSvgComponent } from './fullscreenable-svg.component';

describe('Component: FullscreenableSvg', () => {
  it('should create an instance', () => {
    let component = new FullScreenableSvgComponent();
    expect(component).toBeTruthy();
  });
});

import { Component, OnInit } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-measurement',
  templateUrl: 'measurement.component.html',
  styleUrls: ['measurement.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class MeasurementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router'

@Component({
  moduleId: module.id,
  selector: 'app-analyze',
  templateUrl: 'subsystem-analyze.component.html',
  styleUrls: ['subsystem-analyze.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class SubsystemAnalyzeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

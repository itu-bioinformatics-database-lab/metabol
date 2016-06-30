import { Component, OnInit } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router'

@Component({
  moduleId: module.id,
  selector: 'app-analyze',
  templateUrl: 'analyze.component.html',
  styleUrls: ['analyze.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class AnalyzeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

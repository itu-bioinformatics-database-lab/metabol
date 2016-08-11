import { Component, OnInit } from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {Router, ROUTER_DIRECTIVES } from '@angular/router';
import {AnalyzeService} from '../../../services/analyze/analyze.service';


@Component({
  moduleId: module.id,
  selector: 'app-analyze',
  templateUrl: 'analyze.component.html',
  styleUrls: ['analyze.component.css'],
  providers: [AnalyzeService],
  directives: [ROUTER_DIRECTIVES]
})
export class AnalyzeComponent implements OnInit {

  analyzes: any;

  constructor(private analyzeService: AnalyzeService, private http: Http) { }

  ngOnInit() {
    this.analyzeService.getList((data) => {
      this.analyzes = data;
    });
  }

}

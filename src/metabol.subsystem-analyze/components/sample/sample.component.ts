import {Http} from "@angular/http";
import {ConcentrationTableComponent} from "../concentration-table/concentration-table.component";
import {MetaboliteConcentration} from "../../models/metaboliteConcentration";
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-sample',
  templateUrl: 'sample.component.html',
  styleUrls: ['sample.component.css'],
})
export class SampleComponent implements OnInit {

  conTable: Array<[string, number]> = [];

  constructor(private http: Http) { }

  ngOnInit() {
    this.loadSampleDataSet();
  }

  loadSampleDataSet() {
    this.http.get('assets/example-analyze-doc-files/example.json')
      .map(res => res.json())
      .subscribe((data) => this.conTable = <Array<[string, number]>>_.toPairs(data));
  }
}

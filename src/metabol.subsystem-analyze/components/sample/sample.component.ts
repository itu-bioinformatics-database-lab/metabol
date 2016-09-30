import {Http} from "@angular/http";
import {ConcentrationTableComponent} from "../concentration-table/concentration-table.component";
import {MetaboliteConcentration} from "../../models/metaboliteConcentration";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample',
  templateUrl: 'sample.component.html',
  styleUrls: ['sample.component.css'],
})
export class SampleComponent implements OnInit {

  conTable: Array<MetaboliteConcentration>;

  constructor(private http: Http) {
    this.conTable = new Array<MetaboliteConcentration>();
  }

  ngOnInit() {
    this.loadSampleDataSet();
  }

  loadSampleDataSet() {
    this.http.get('/assets/example-analyze-doc-files/example.json')
      .map(res => res.json())
      .subscribe((data) => this.conTable = data);
  }
}

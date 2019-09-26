import { Component, OnInit, AfterViewInit } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';

import { AppSettings } from "../../../app";
import { LoginService } from "../../../metabol.auth/services";

declare var Plotly: any;


@Component({
  selector: 'app-compare-analysis',
  templateUrl: './compare-analysis.component.html',
  styleUrls: ['./compare-analysis.component.css']
})
export class CompareAnalysisComponent implements OnInit, AfterViewInit {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private login: LoginService) { }

  options;

  analyses;
  visualization;

  ngOnInit() {
    this.route.params.subscribe((params) => {

      // this.options = this.login.optionByAuthorization();
      // this.options.params = new HttpParams();
      // for (let k in params) this.options.params.set(k, params[k]);
      // console.log(this.options.params);
      // console.log(Object.keys(params))
      this.options = {  "data" : params }
      this.getAnalysesData(this.options);
    });
  }



  // let data = {
  //   "name": this.analyzeName.value,
  //   "public": this.type.value,
  //   "concentration_changes": _.fromPairs(this.conTable)
  // };
  //
  getAnalysesData(options) {
    let apiUrl = `${AppSettings.API_ENDPOINT}/analysis/set`;
    // let apiUrl = `http://127.0.0.1:5000/analysis/set`;

    // http://127.0.0.1:5000

    this.http.post(apiUrl, options)
      .subscribe((data:any) => this.analyses = data);
    // console.log(this.options);
    // console.log(this.analyses);


  }

  getVisualizationData(options) {
    let apiUrl = `${AppSettings.API_ENDPOINT}/analysis/visualization`;
    // http://127.0.0.1:5000
    //   let apiUrl = `http://127.0.0.1:5000/analysis/visualization`;

    this.http.post(apiUrl, options)
      .subscribe((data:any) => {
        data.type = 'heatmap';
        console.log(data);

        let layout = { margin: { l: 300 }, height: 1500 };
        Plotly.plot('heatmap', [data], layout);
      });
  }

  ngAfterViewInit() {
    console.log(this.options);
    this.getVisualizationData(this.options);

  }

}

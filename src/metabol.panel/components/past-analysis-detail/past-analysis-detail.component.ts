import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { map } from "rxjs/operators";
import { LoginService } from "../../../metabol.auth/services";
import { AppSettings } from "../../../app";
import { DialogPathwayVisualizationComponent } from '../dialog-pathway-visualization';
import { DialogReactionResultsComponent } from '../dialog-reaction-results';

import * as _ from 'lodash';

@Component({
  selector: 'app-past-analysis-detail',
  templateUrl: './past-analysis-detail.component.html',
  styleUrls: ['./past-analysis-detail.component.css']
})
export class PastAnalysisDetailComponent implements OnInit {

  id;
  data;

  constructor(
    private http: HttpClient,
    private login: LoginService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['key'];
      this.getData();
    });
  }

  getData() {


    let apiUrl = `${AppSettings.API_ENDPOINT}/analysis/detail/${this.id}`;
    //   let apiUrl = `http://127.0.0.1:5000/analysis/detail/${this.id}`;

      this.http.get(apiUrl, this.login.optionByAuthorization())
      .subscribe((data:any) => {
        this.data = data;
        console.log(this.data);
      });
  }
}

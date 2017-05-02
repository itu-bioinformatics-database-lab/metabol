import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { LoginService } from "../../../metabol.auth/services";
import { AppSettings } from "../../../app";
import { DialogPathwayVisualizationComponent } from '../dialog-pathway-visualization';
import { DialogReactionResultsComponent } from '../dialog-reaction-results';


@Component({
  selector: 'app-past-analysis-detail',
  templateUrl: './past-analysis-detail.component.html',
  styleUrls: ['./past-analysis-detail.component.css']
})
export class PastAnalysisDetailComponent implements OnInit {

  data;

  constructor(
    private http: Http,
    private login: LoginService,
    private route: ActivatedRoute,
    private dialog: MdDialog) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.getData(params['key']);
    });
  }

  getData(id) {
    let apiUrl = `${AppSettings.API_ENDPOINT}/analysis/detail/${id}`;
    this.http.get(apiUrl, this.login.optionByAuthorization())
      .map(res => res.json())
      .subscribe((data) => {
        this.data = data;
      });
  }

  openReactionDialog(pathway) {
    let dialogRef = this.dialog.open(DialogReactionResultsComponent);
    dialogRef.componentInstance.fluxData = this.data.results.reaction[0];
    dialogRef.componentInstance.pathway = pathway;
  }

  openPathwayDialog(pathway) {
    let dialogRef = this.dialog.open(DialogPathwayVisualizationComponent, {
      width: '1000px',
    });
    dialogRef.componentInstance.pathway = pathway.split('_')[0];
    dialogRef.componentInstance.fluxes = this.data.results.reaction;
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

import { AppSettings } from '../../../app/';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-analysis-search',
  templateUrl: './analysis-search.component.html',
  styleUrls: ['./analysis-search.component.css']
})
export class AnalysisSearchComponent implements OnInit {

  pathwayChanges: { [key: string]: number } = {};

  form: FormGroup;

  constructor(private fb: FormBuilder, private http: Http, private notify: NotificationsService) {
    this.form = this.fb.group({
      "name": ["", Validators.required],
      "value": [""]
    });
  }

  remove(index) {
    this.conTable.splice(index, 1);
  }

  add(value) {
    this.conTable.push([value['name'], parseInt(value['value'])]);
    this.form.reset();
  }

  analyze() {
    let data = {
      "name": this.analyzeName.value,
      "concentration_changes": _.fromPairs(this.conTable)
    };

    this.http.post(`${AppSettings.API_ENDPOINT}/analysis/fva`,
      data, this.login.optionByAuthorization())
      .map(data => data.json())
      .subscribe((data) => {
        this.notify.info('Analysis Start', 'Analysis in progress');
        this.router.navigate(['/panel/past-analysis', data['id']]);
      },
      error => {
        this.notify.error('Analysis Fail', error);
      });
  }

}

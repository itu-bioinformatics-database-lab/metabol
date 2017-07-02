import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

import { AppSettings } from '../../../app/';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'analysis-search',
  templateUrl: './analysis-search.component.html',
  styleUrls: ['./analysis-search.component.css']
})
export class AnalysisSearchComponent implements OnInit {

  pathwayChanges = [];

  form: FormGroup;

  constructor(private fb: FormBuilder, private http: Http, private router: Router) {
    this.form = this.fb.group({
      "name": ["", Validators.required],
      "value": [""]
    });
  }

  ngOnInit() { }

  remove(index) {
    this.pathwayChanges.splice(index, 1);
  }

  add(value) {
    this.pathwayChanges.push([value['name'], parseInt(value['value'])]);
    this.form.reset();
  }

  search() {
    let data = { changes: _.fromPairs(this.pathwayChanges) };

    this.http.post(`${AppSettings.API_ENDPOINT}/analysis/search-by-change`, data)
      .map(data => data.json())
      .subscribe((data) => {
        localStorage.setItem('search-results', JSON.stringify(data));
        this.router.navigate(['past-analysis']);
      });
  }

}

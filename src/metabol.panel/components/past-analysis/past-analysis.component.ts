import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';

import {AppSettings} from "../../../app";
import {LoginService} from "../../../metabol.auth/services";
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';


@Component({
  selector: 'app-past-analysis',
  templateUrl: './past-analysis.component.html',
  styleUrls: ['./past-analysis.component.css']
})
export class PastAnalysisComponent implements OnInit {

  data: Array<any>;
  form = new FormGroup({});

  constructor(private http: Http, private fb: FormBuilder, private login: LoginService, private router: Router) { }

  ngOnInit() {
    let apiUrl = `${AppSettings.API_ENDPOINT}/analysis/list`;
    this.http.get(apiUrl, this.login.optionByAuthorization())
      .map(res => res.json())
      .subscribe((data) => {
        this.data = data;
        this.createForm();
      });
  }

  createForm() {
    console.log(this.data);
    this.form = this.fb.group(_.zipObject(
      this.data.map(x => x.id),
      _.times(this.data.length, _.constant(new FormControl(false)))
    ));
  }

  submit() {
    console.log(this.form.value);
    this.router.navigate(['panel', 'compare-analysis', 1, 2])
  }

}

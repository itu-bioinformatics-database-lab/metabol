import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

import { LoginService } from "../../../metabol.auth/services";
import { MetaboliteConcentration } from '../../models/metaboliteConcentration';
import { SubsystemAnalyzeService } from "../../services/subsystem-analyze/subsystem-analyze.service";
import { AppSettings } from '../../../app/';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'concentration-table',
  templateUrl: 'concentration-table.component.html',
  styleUrls: ['concentration-table.component.css'],
  providers: [SubsystemAnalyzeService],
})
export class ConcentrationTableComponent implements OnInit {
  @Input() conTable: Array<[string, number]> = [];

  form: FormGroup;
  analyzeName: FormControl;
  type: FormControl;
  isAdmin = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private login: LoginService,
    private http: HttpClient,
    private notify: NotificationsService) { }

  ngOnInit() {
    this.form = this.createForm();
    this.analyzeName = new FormControl("My Analyze", Validators.required);
    this.type = new FormControl('public', Validators.required);
    if (localStorage.getItem('admin' ) === 'tajtest2019@gmail.com'){
      this.isAdmin = true ;
    }

  }

  remove(index) {
    this.conTable.splice(index, 1);
  }

  createForm() {
    return this.fb.group({
      "name": ["", Validators.required],
      "value": ["", Validators.pattern('[0-9]+(\\.[0-9]+)?')]
    });
  }

  onSubmit(value) {
    this.conTable.push([value['name'], parseInt(value['value'])]);
    this.form = this.createForm();
  }

  analyze() {
    let data = {
      "name": this.analyzeName.value,
      "public": this.type.value,
      "concentration_changes": _.fromPairs(this.conTable)
    };


    this.http.post(`${AppSettings.API_ENDPOINT}/analysis/fva`,
    // this.http.post(`http://127.0.0.1:5000/analysis/fva`,

      data, this.login.optionByAuthorization())
      .subscribe((data:any) => {
        this.notify.info('Analysis Start', 'Analysis in progress');
        this.router.navigate(['/past-analysis', data['id']]);
      },
      error => {
        this.notify.error('Analysis Fail', error);
      });
  }
}

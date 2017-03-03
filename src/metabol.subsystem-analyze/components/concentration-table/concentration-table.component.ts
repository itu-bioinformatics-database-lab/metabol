import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {LoadingService} from "../../../metabol.common/services";
import {MetaboliteConcentration} from '../../models/metaboliteConcentration';
import {SubsystemAnalyzeService} from "../../services/subsystem-analyze/subsystem-analyze.service";

@Component({
  selector: 'concentration-table',
  templateUrl: 'concentration-table.component.html',
  styleUrls: ['concentration-table.component.css'],
  providers: [SubsystemAnalyzeService],
})
export class ConcentrationTableComponent {
  @Input() conTable: Array<[string, number]> = [];

  form: FormGroup;
  analyzeName: FormControl;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loading: LoadingService) {

    this.form = this.createForm();
    this.analyzeName = new FormControl("My Analyze", Validators.required);
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
    this.conTable.push([value['name'], value['value']]);
    this.form = this.createForm();
  }

  analyze() {

    this.router.navigate(['/panel/past-analysis']);

  }
}

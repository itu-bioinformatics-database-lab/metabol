import { Component, OnInit } from '@angular/core';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators} from '@angular/common';
import {ConcentrationTableComponent} from '../concentration-table/concentration-table.component';
import {MetaboliteConcentration} from '../../models/metaboliteConcentration';

@Component({
  moduleId: module.id,
  selector: 'app-manual',
  templateUrl: 'manual.component.html',
  styleUrls: ['manual.component.css'],
  directives: [ConcentrationTableComponent]
})
export class ManualComponent {

  conTable: Array<MetaboliteConcentration>;

  constructor(private fb: FormBuilder) {
    this.conTable = new Array<MetaboliteConcentration>();
  }

}

import {LoadingService} from "../../../common/services";
import { Component, OnInit, Input } from '@angular/core';
import {MetaboliteConcentration} from '../../models/metaboliteConcentration';
import {Control, FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators} from '@angular/common';
import {KeysPipe} from '../../../common/pipes';
// import {FbaService} from '../../../services/fba/fba.service';
import {Router} from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'concentration-table',
  templateUrl: 'concentration-table.component.html',
  styleUrls: ['concentration-table.component.css'],
  // providers: [FbaService],
  pipes: [KeysPipe]
})
export class ConcentrationTableComponent {
  @Input() conTable: Array<MetaboliteConcentration>;

  change = {
    '1': 'Increase Slightly',
    '2': 'Increase Dyramaticly',
    '-1': 'Decrease Slightly',
    '-2': 'Decrease Dyramaticly',
    '10': 'Exact Value'
  };

  form: ControlGroup;
  analyzeName: Control;

  constructor(private fb: FormBuilder, private router: Router, private loading: LoadingService) {
    this.form = this.createForm();
    this.analyzeName = new Control("My Analyze", Validators.required);
  }

  remove(index) {
    this.conTable.splice(index, 1);
  }

  createForm() {
    return this.fb.group({
      "name": ["", Validators.required],
      "change": ["", Validators.required],
      "value": ["", Validators.pattern('[0-9]+(\\.[0-9]+)?')]
    }, { validator: this.concentrationValueValidation });
  }

  concentrationValueValidation(group: ControlGroup) {
    if (group.controls["change"].value == "Exact Value"
      && !group.controls["value"].value.trim())
      return { exactValueEmpty: true };
    return null;
  }

  onSubmit(value) {
    let c = new MetaboliteConcentration();
    c.name = value['name'];
    c.change = value['change'];
    c.exactValue = value['value'];
    this.conTable.push(c);
    this.form = this.createForm();
  }

  analyze() {
      this.router.navigate(['/subsystem-analyze']);
    // this.fba.getFbaKeyForData(this.analyzeName.value, this.conTable, (key) => {
    // });
  }

}

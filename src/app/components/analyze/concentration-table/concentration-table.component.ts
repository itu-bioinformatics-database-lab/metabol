import { Component, OnInit, Input } from '@angular/core';
import {MetaboliteConcentration} from '../../../services/fba/metaboliteConcentration';
import {Control, FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators} from '@angular/common';
import {KeysPipe} from '../../../pipes/keys.pipe';
import {FbaService} from '../../../services/fba/fba.service';
import {Router} from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'concentration-table',
  templateUrl: 'concentration-table.component.html',
  styleUrls: ['concentration-table.component.css'],
  providers: [FbaService],
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

  constructor(private fb: FormBuilder, private fba: FbaService, private router: Router) {
    this.form = this.createForm();
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
    // this.fba.getFbaKeyForData(this.conTable,
    //   (key) => this.router.navigate(['FbaResult', { 'fbaKey': key }]));
  }

}

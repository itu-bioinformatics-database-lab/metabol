import {LoadingService} from "../../../metabol.common/services";
import { Component, OnInit, Input } from '@angular/core';
import {MetaboliteConcentration} from '../../models/metaboliteConcentration';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SubsystemAnalyzeService} from "../../services/subsystem-analyze/subsystem-analyze.service";

@Component({
  selector: 'concentration-table',
  templateUrl: 'concentration-table.component.html',
  styleUrls: ['concentration-table.component.css'],
  providers: [SubsystemAnalyzeService],
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

  form: FormGroup;
  analyzeName: FormControl;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loading: LoadingService,
    private analyzeService: SubsystemAnalyzeService) {

    this.form = this.createForm();
    this.analyzeName = new FormControl("My Analyze", Validators.required);
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

  concentrationValueValidation(group: FormGroup) {
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

    let onlyWorkingData: MetaboliteConcentration[] = [
      {
        name: "acon_C_c",
        change: 1,
        exactValue: 0
      }
    ];

    let key = "6bda7485-19f2-49bf-9489-1dfdde84cc73";
    this.router.navigate(['/subsystem', key]);

    // this.analyzeService.startSolutions(this.analyzeName.value, onlyWorkingData,
    //   (key) => {
    //     this.router.navigate(['/subsystem', key]);
    //   });
  }

}

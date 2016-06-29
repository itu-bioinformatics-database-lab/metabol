import { Component,OnChanges, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {KeysPipe} from '../../../pipes/keys.pipe';


@Component({
  moduleId: module.id,
  selector: 'app-chemical-equation',
  templateUrl: 'chemical-equation.component.html',
  styleUrls: ['chemical-equation.component.css']
})
export class ChemicalEquationComponent {
  @Input()
  metabolites: any[];
  @Input()
  selectedMetabolite: Object;
  reactants: Object = {};
  products: Object = {};


  //TODO: check if given data is resolved
  ngOnChanges() {
    this.metabolites.filter((key) => key.stoichiometry > 0)
      .map((key) => this.reactants[key.id] = key.stoichiometry);
    this.metabolites.filter((key) => key.stoichiometry < 0)
      .map((key) => this.products[key.id] = Math.abs(key.stoichiometry));


  }

}

import { Component, OnChanges, OnInit, Input} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {KeysPipe} from '../../../../common/pipes';


@Component({
  moduleId: module.id,
  selector: 'chemical-equation',
  templateUrl: 'chemical-equation.component.html',
  styleUrls: ['chemical-equation.component.css'],
  directives: [ROUTER_DIRECTIVES],
  pipes: [KeysPipe]
})
export class ChemicalEquationComponent {
  @Input() metabolites: any[];
  @Input() selectedMetabolite: Object;
  reactants: Array<{ id: string, stoichiometry: number }>;
  products: Array<{ id: string, stoichiometry: number }>;

  constructor() {
    this.reactants = new Array<{ id: string, stoichiometry: number }>();
    this.products = new Array<{ id: string, stoichiometry: number }>();
  }

  // TODO: check if given data is resolved
  ngOnChanges() {
    this.constructor();

    this.metabolites
      .filter((key) => key.stoichiometry > 0)
      .forEach((key) => {
        this.reactants.push({
          id: key.id,
          stoichiometry: key.stoichiometry
        });
      });

    this.metabolites
      .filter((key) => key.stoichiometry < 0)
      .forEach((key) => {
        this.products.push({
          id: key.id,
          stoichiometry: Math.abs(key.stoichiometry)
        });
      });
  }

}

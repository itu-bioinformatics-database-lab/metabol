import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ROUTER_DIRECTIVES} from '@angular/router';
import {MetaboliteService} from '../../../services/metabolite/metabolite.service';
import {ChemicalEquationComponent} from '../chemical-equation/chemical-equation.component';
import {KeysPipe} from '../../../pipes/keys.pipe';

@Component({
  moduleId: module.id,
  selector: 'app-metabolite-details',
  templateUrl: 'metabolite-details.component.html',
  styleUrls: ['metabolite-details.component.css'],
  directives: [ROUTER_DIRECTIVES, ChemicalEquationComponent],
  providers: [MetaboliteService]
})
export class MetaboliteDetailsComponent implements OnInit {

  metabolite: any;
  relatedReactions: Array<any>;

  constructor(private mea: MetaboliteService, private route: ActivatedRoute) {
    this.metabolite = new Object();
    this.relatedReactions = new Array<any>();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.loadData(params['metaboliteId']);
    });
  }

  loadData(metaboliteId) {
    let a: string;

    this.mea.getMetabolite(metaboliteId).subscribe(data => {
      this.metabolite = data;
      this.metabolite.notes = this.metabolite.notes.split('\n');
      this.mea.getRelatedReactions(metaboliteId)
        .subscribe(data => {
          this.relatedReactions = data['reactions'];
        });
    });
  }

}

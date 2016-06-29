import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MetaboliteService} from '../../../services/metabolite/metabolite.service';
import {ChemicalEquationComponent} from '../chemical-equation/chemical-equation.component';
import {KeysPipe} from '../../../pipes/keys.pipe';

@Component({
  moduleId: module.id,
  selector: 'app-metabolite-details',
  templateUrl: 'metabolite-details.component.html',
  styleUrls: ['metabolite-details.component.css']
})
export class MetaboliteDetailsComponent implements OnInit {

  constructor(
    private _metaboliteService: MetaboliteService,
    private _route: ActivatedRoute
    ) { };

  metabolite: any = {};
  relatedReactions: any = {};

  ngOnInit() {
    let metaboliteId = this._route.params.subscribe((params) => {
      params['metaboliteId'];
      this.getMetabolite(params['metaboliteId'])
      this.getRelatedReactions(params['metaboliteId'])
    });
  }

  private getMetabolite(metaboliteId) {
    this._metaboliteService.getMetabolite(metaboliteId).subscribe(
      data => this.metabolite = data
      )
  }
  private getRelatedReactions(metaboliteId) {
    this._metaboliteService.getRelatedReactions(metaboliteId).subscribe(
      data => this.relatedReactions = data
      )

  }

  //    check_metabolite_detail(){

  //        if(this.metabolite.length ==)
  //    }

}

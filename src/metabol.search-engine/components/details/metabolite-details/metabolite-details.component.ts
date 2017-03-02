import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {ChemicalEquationComponent} from '../chemical-equation/chemical-equation.component';
import {MetaboliteService} from '../../../services/metabolite/metabolite.service';
import {MetaboliteVisualizationService} from '../../../services/metabolite/metabolite-visualization.service';

import {LoadingService} from "../../../../metabol.common/services";
import { AppDataLoader } from '../../../../metabol.common/services';

import {FbaNode, FbaLink} from '../../../../metabol.visualizations/models';
import {RelatedToVisualizationService} from '../../../../metabol.visualizations/services';

import * as _ from 'lodash';
@Component({
  selector: 'app-metabolite-details',
  templateUrl: 'metabolite-details.component.html',
  styleUrls: ['metabolite-details.component.css'],
  providers: [MetaboliteService, MetaboliteVisualizationService]
})
export class MetaboliteDetailsComponent implements OnInit {

  metabolite: any;
  relatedReactions: Array<any>;
  nodes: Array<FbaNode>;
  links: Array<FbaLink>;
  recon: any;

  constructor(
    private mea: MetaboliteService,
    private route: ActivatedRoute,
    private meaVis: MetaboliteVisualizationService,
    private loading: LoadingService,
    private loader: AppDataLoader,
    private relatedToVisual: RelatedToVisualizationService) {

    this.metabolite = new Object();
    this.relatedReactions = new Array<any>();
    this.nodes = new Array<FbaNode>();
    this.links = new Array<FbaLink>();
    this.recon = loader.get("recon2")
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.loadData(params['metaboliteId']);
    });
  }

  loadData(metaboliteId) {
    this.metabolite = this.recon.metabolites[metaboliteId];
  
    let all_reactions = this.recon.reactions;
    let reactionsList =  Object.keys(all_reactions)

    for(let reaction of reactionsList)
        if (all_reactions[reaction].formula[metaboliteId]){
            this.relatedReactions.push({id: all_reactions[reaction].id,
                                        name: all_reactions[reaction].name,
                                        subsystem: all_reactions[reaction].subsystem,
                                        stoichiometry: all_reactions[reaction].stoichiometry,
                                        formula: all_reactions[reaction].formula})}
  }

  loadVisualization() {
    [this.nodes, this.links] = this.relatedToVisual
      .visualizeMetaboliteDetail(this.metabolite, this.relatedReactions);
  }

}

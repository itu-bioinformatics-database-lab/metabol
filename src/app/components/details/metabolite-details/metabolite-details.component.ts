import {LoadingService} from "../../../services/loading/loading.service";
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ROUTER_DIRECTIVES} from '@angular/router';
import {MetaboliteService} from '../../../services/metabolite/metabolite.service';
import {MetaboliteVisualizationService} from '../../../services/metabolite/metabolite-visualization.service';
import {ChemicalEquationComponent} from '../chemical-equation/chemical-equation.component';
import {KeysPipe} from '../../../pipes/keys.pipe';
import {FbaNode, FbaLink} from '../../../models/fbaiteration';
import {VisualizationComponent} from '../../visualization/visualization.component';

@Component({
  moduleId: module.id,
  selector: 'app-metabolite-details',
  templateUrl: 'metabolite-details.component.html',
  styleUrls: ['metabolite-details.component.css'],
  directives: [ROUTER_DIRECTIVES, ChemicalEquationComponent, VisualizationComponent],
  providers: [MetaboliteService, MetaboliteVisualizationService]
})
export class MetaboliteDetailsComponent implements OnInit {

  metabolite: any;
  relatedReactions: Array<any>;
  nodes: Array<FbaNode>;
  links: Array<FbaLink>;

  constructor(
    private mea: MetaboliteService,
    private route: ActivatedRoute,
    private meaVis: MetaboliteVisualizationService,
    private loading: LoadingService) {

    this.metabolite = new Object();
    this.relatedReactions = new Array<any>();
    this.nodes = new Array<FbaNode>();
    this.links = new Array<FbaLink>();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.loadData(params['metaboliteId']);
    });
  }

  loadData(metaboliteId) {
    this.loading.start();
    this.mea.getMetabolite(metaboliteId).subscribe(data => {
      this.metabolite = data;
      if (this.metabolite.notes)
        this.metabolite.notes = data.notes.split('\n');
      this.mea.getRelatedReactions(metaboliteId)
        .subscribe(data => {
          this.relatedReactions = data['reactions'];
          this.loadVisualization();
          this.loading.finish();
        });
    });
  }

  loadVisualization() {
    [this.nodes, this.links] = this.meaVis
      .convertToFbaVisualization(this.metabolite, this.relatedReactions);
  }

}

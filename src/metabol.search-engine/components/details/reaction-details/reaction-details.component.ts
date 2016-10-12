import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ReactionService} from '../../../services/reaction/reaction.service';
import {ReactionVisualizationService} from '../../../services/reaction/reaction-visualization.service';
import {ChemicalEquationComponent} from '../chemical-equation/chemical-equation.component';
import {Reaction} from '../../../models/reaction';
import {RelatedMetabolite} from '../../../models/relateds';

import {LoadingService} from "../../../../metabol.common/services";

import {FbaNode, FbaLink} from '../../../../metabol.visualizations/models';
import {VisualizationComponent} from '../../../../metabol.visualizations/components';
import {RelatedToVisualizationService} from '../../../../metabol.visualizations/services';

@Component({
  selector: 'app-reaction-details',
  templateUrl: 'reaction-details.component.html',
  styleUrls: ['reaction-details.component.css'],
  providers: [ReactionService, ReactionVisualizationService],
})
export class ReactionDetailsComponent implements OnInit {
  reaction: Reaction;
  relatedMetabolites: RelatedMetabolite[];
  nodes: Array<FbaNode>;
  links: Array<FbaLink>;

  constructor(
    private rea: ReactionService,
    private route: ActivatedRoute,
    private reaVis: ReactionVisualizationService,
    private loading: LoadingService,
    private relatedToVisual: RelatedToVisualizationService
  ) {
    this.reaction = new Reaction();
    this.nodes = new Array<FbaNode>();
    this.links = new Array<FbaLink>();
  };

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.loadData(params['reactionId']);
    });
  }

  loadData(reactionId) {
    this.loading.start();
    this.rea.getReaction(reactionId).subscribe(data => {
      this.reaction = data;
      if (this.reaction.notes)
        this.reaction.notes = data.notes.split('\n');
      this.rea.getRelatedMetabolites(reactionId)
        .subscribe((data) => {
          this.relatedMetabolites = data['metabolites'];
          this.loadVisualization();
          this.loading.finish();
        });
    });
  }

  loadVisualization() {
    [this.nodes, this.links] = this.relatedToVisual
      .visualizeReactionDetail(this.reaction, this.relatedMetabolites);
  }

}
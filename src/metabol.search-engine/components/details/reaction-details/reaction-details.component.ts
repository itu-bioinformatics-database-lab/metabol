import { Component, OnInit, ElementRef } from '@angular/core';
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
import * as d3 from 'd3';

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
    private relatedToVisual: RelatedToVisualizationService,
    private elementRef: ElementRef
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
    this.build();
    console.log(d3.select(this.elementRef.nativeElement)
      .select('#map_container_3'));
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

  build() {
    var custom_model = {
      reactions: [
        {
          "id": "ENO",
          "name": "enolase",
          "upper_bound": 1000.0,
          "lower_bound": -1000.0,
          "metabolites": { "pep_c": 1.0, "h2o_c": 1.0, "2pg_c": -1.0 },
          "gene_reaction_rule": "b2779"
        }
      ],
      metabolites: [
        { name: "Phosphoenolpyruvate", id: "pep_c" },
        { name: "D-Glycerate 2-phosphate", id: "2pg_c" },
        { name: "H2O", id: "h2o_c" }
      ],
      genes: [
        { name: "nuoK", id: "b2279" }
      ]
    }

    // set a callback to run when the Builder is ready
    var first_load_callback = function() {
      // Get a nice starting location for the reaction
      var size = this.zoom_container.get_size()
      var start_coords = {
        x: 100,
        y: -80
      }
      var start_direction = 90

      // Draw the reaction
      this.map.new_reaction_from_scratch('ENO', start_coords, start_direction)

      // And zoom the map to focus on that reaction
      this.map.zoom_extent_nodes()

      // After building a reaction, Escher selects the newest
      // metabolite. Unselect it like this.
      this.map.select_none()
    }

    // Set up the Builder
    var options3 = {
      // just show the zoom buttons
      menu: 'zoom',
      // do not use the smooth pan and zoom option
      use_3d_transform: false,
      // no editing in this map
      enable_editing: false,
      // no keyboard shortcuts
      enable_keys: false,
      // show the descriptive names
      identifiers_on_map: 'name',
      // The callback
      first_load_callback: first_load_callback
    };

    let visualizationElement = d3.select(this.elementRef.nativeElement)
      .select('#map_container_3')[0][0];
    escher.Builder(null, custom_model, null, visualizationElement, null);

  }

}

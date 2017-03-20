import { Component, OnInit, ElementRef,OnChanges,Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { AppDataLoader } from '../../../metabol.common/services';
import * as d3 from 'd3';
import * as _ from 'lodash';

@Component({
  selector: 'visualization-reaction',
  templateUrl: 'reaction-visualization.component.html',
  styleUrls: ['reaction-visualization.component.css'],
})
export class ReactionVisualizationComponent implements OnChanges {

  @Input()reaction;
  @Input()relatedMetabolites;
  @Input()relatedMetabolitesEscher;

  constructor(private route: ActivatedRoute, private loader: AppDataLoader,private elementRef: ElementRef) { }

    ngOnChanges(){
    this.build();
  }

  build() {
    let that = this;

    let custom_model = {
      reactions: [
        {
          "id": this.reaction.id,
          "name": this.reaction["name"],
          "upper_bound": this.reaction["upper_bound"],
          "lower_bound": this.reaction["lower_bound"],
          "metabolites": this.reaction["metabolites"],
        }
      ],
      metabolites: this.relatedMetabolitesEscher ,//Keeps list of dictionaries
      genes: [
        // { name: "A MANASE", id: "4123_AT1" }
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

      this.map.new_reaction_from_scratch(that.reaction.id, start_coords, start_direction)

      // And zoom the map to focus on that reaction
      this.map.zoom_extent_nodes()

      // After building a reaction, Escher selects the newest
      // metabolite. Unselect it like this.
      this.map.select_none()
    }

    // Set up the Builder
    let stylle = window.getComputedStyle(this.elementRef.nativeElement)
    console.log
    let options3 = {
      // just show the zoom buttons
      menu: 'zoom',
      // do not use the smooth pan and zoom option
      use_3d_transform: false,
      // no editing in this map
      enable_editing: false,
      // no keyboard shortcuts
      enable_keys: false,
      // show the descriptive names
      // identifiers_on_map: 'name',
      text_label:false,
      // The callback
      first_load_callback: first_load_callback,
      // No tooltips
      enable_tooltips: false,
      tooltip_component:false,
      scroll_behavior: 'zoom',
      full_screen_button:true,

    };

    let visualizationElement = d3.select(d3.select(this.elementRef.nativeElement).select('#map_container_3')[0][0]);

    escher.Builder(null,custom_model, null, visualizationElement, options3);

  }


}

import { Component, OnInit, ElementRef,AfterViewInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { AppDataLoader } from '../../../metabol.common/services';
import * as d3 from 'd3';
import * as _ from 'lodash';

@Component({
  selector: 'visualization-metabolite',
  templateUrl: 'metabolite-visualization.component.html',
  styleUrls: ['metabolite-visualization.component.css'],
})
export class MetaboliteVisualizationComponent implements OnInit, AfterViewInit {

  metabolite;
  relatedReactions;
  relatedMetabolites;
  metaboliteEscher;
  relatedReactionEscher;
  relatedMetabolitesEscher;
  cm;

  constructor(private route: ActivatedRoute, private loader: AppDataLoader,private elementRef: ElementRef) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.loader.get("recon2", (recon) => {
        this.metabolite = recon.metabolites[params['id']];

        this.relatedReactions = this.metabolite.reactions
          .map(x => recon.reactions[x]);

        this.relatedReactionEscher =   this.relatedReactions.map(x => _.pick(x,["id","name","upper_bound","lower_bound","metabolites"]));
        // this.cm = this.relatedReactions.map(x => x["metabolites"]);
        // console.log(this.cm)
        // // this.relatedMetabolites = this.metabolite["reactions"];
        // this.relatedMetabolitesEscher =   this.relatedMetabolites.map(x => _.pick(x,["name","id"]));
        // console.log(this.relatedMetabolitesEscher);


      });
    });
  }

  ngAfterViewInit(){
    this.build();

  }

  build() {
    let that = this;

    // let custom_model = {
    //   reactions:[this.relatedReactionEscher],
    //   metabolites:[],
    //   genes:[{}]
    //
    //
    // }

    let custom_model = {
      reactions: [{
        "id": "RE3001M",
        "name": "RE3001",
        "upper_bound": 1000,
        "lower_bound": -1000,
        "metabolites": {"CE5118_m" :-1,"CE5119_m":1,"h_m":-1,"nadp_m":1,"nadph_m":-1},
      },
      {
        "id": "RE3000M",
        "name": "RE3000",
        "upper_bound": 1000,
        "lower_bound": -1000,
        "metabolites": {"CE5118_m":1,"CE5117_m":-1},
      }],
      metabolites: [{
        "id": "CE5118_m",
        "name": "trans-2-cis,cis-4,8-tetradecatrienoyl-CoA",
      },
      {"id": "CE5117_m",
      "name": "(3E,5Z,8Z)-tetradecatrienoyl-CoA",},
      {"id": "CE5119_m",
      "name": " trans-3-cis-8-tetradecadienoyl-CoA",},
      {"id": "h_m",
      "name": "proton",},
      {"id": "nadp_m",
      "name": "NADP(3-)",},
      {"id": "nadph_m",
      "name": "NADPH(4-)",},

    ] ,//Keeps list of dictionaries
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
      // for(let i = 0;i<that.relatedReactionEscher.length;i++){
      //   console.log(that.relatedReactionEscher[i])
      //   this.map.new_reaction_from_scratch(that.relatedReactionEscher[i]["id"], start_coords, start_direction)
      // }
      // let k = ["RE3000M","RE3001M"]
      // for(let r of k){
      //
      //   this.map.new_reaction_from_scratch(r, start_coords, start_direction)
      //   // start_coords["x"]=start_coords["x"]+20
      //   start_coords["y"]= start_coords["y"]+20
      //   start_direction = start_direction+90;
      //  }
      //
      // // And zoom the map to focus on that reaction
      // this.map.zoom_extent_nodes()
      //
      // // After building a reaction, Escher selects the newest
      // // metabolite. Unselect it like this.
      // this.map.select_none()
      // this.map.draw_these_reactions(["RE3000M"],true)
      this.map.draw_all_reactions(true,false)
      // this.map.zoom_extent_nodes()
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
      identifiers_on_map: 'name',
      // The callback
      first_load_callback: first_load_callback,
      // No tooltips
      enable_tooltips: false,
      tooltip_component:false,
      scroll_behavior: 'zoom',

    };

    let visualizationElement = d3.select(d3.select(this.elementRef.nativeElement).select('#map_container_3')[0][0]);

    escher.Builder(null,custom_model, null, visualizationElement, options3);

  }


}

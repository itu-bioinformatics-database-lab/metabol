import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { AppDataLoader } from '../../../metabol.common/services';
import {MetaboliteVisualizationComponent} from '../../../metabol.visualization/components'
import * as _ from 'lodash';

@Component({
  selector: 'app-metabolite-details',
  templateUrl: 'metabolite-details.component.html',
  styleUrls: ['metabolite-details.component.css'],
})
export class MetaboliteDetailsComponent implements OnInit {

  metabolite;
  relatedReactions;
  relatedReactionEscher;

  constructor(private route: ActivatedRoute, private loader: AppDataLoader) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.loader.get("recon2", (recon) => {
        this.metabolite = recon.metabolites[params['id']];
        // console.log(this.metabolite)
        this.relatedReactions = this.metabolite.reactions
          .map(x => recon.reactions[x]);
          this.relatedReactionEscher =   this.relatedReactions.map(x => _.pick(x,["id","name","upper_bound","lower_bound", "metabolites"]));
          console.log(this.relatedReactionEscher);

      });
    });
  }

}

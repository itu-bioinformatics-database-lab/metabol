import { Component, OnInit } from '@angular/core';
import {ROUTER_DIRECTIVES, ActivatedRoute} from '@angular/router';
import {ReactionService} from '../../../services/reaction/reaction.service';
import {ChemicalEquationComponent} from '../chemical-equation/chemical-equation.component';
import {KeysPipe} from '../../../pipes/keys.pipe';
import {Reaction} from '../../../services/reaction/reaction';

@Component({
  moduleId: module.id,
  selector: 'app-reaction-details',
  templateUrl: 'reaction-details.component.html',
  styleUrls: ['reaction-details.component.css'],
  directives: [ROUTER_DIRECTIVES, ChemicalEquationComponent],
  pipes: [KeysPipe]
})
export class ReactionDetailsComponent implements OnInit {
  reaction: Reaction;
  relatedMetabolites: Array<any>;

  constructor(private rea: ReactionService, private route: ActivatedRoute) {
    this.reaction = new Reaction();
    this.relatedMetabolites = new Array<any>();
    this.check();
  };

  ngOnInit() {
    let reactionId = this.route.params.subscribe((params) => {
      params['reactionId']


      this.rea.getReaction(params['reactionId'])
        .subscribe(data => this.reaction = data);

      this.rea.getRelatedMetabolites(params['reactionId'])
        .subscribe(data => this.relatedMetabolites = data['metabolites']);
    });


  }

  check() { //If array is empty run again to fill it
    let reactionId = this.route.params.subscribe((params) => {
      params['reactionId']

      if (this.reaction.id == null || this.relatedMetabolites.length == 0)
        this.rea.getRelatedMetabolites(params['reactionId'])
          .subscribe(data => this.relatedMetabolites = data['metabolites']);

      this.rea.getReaction(params['reactionId'])
        .subscribe(data => this.reaction = data);

    });


  }

}

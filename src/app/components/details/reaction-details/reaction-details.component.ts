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
  providers: [ReactionService],
  pipes: [KeysPipe]
})
export class ReactionDetailsComponent implements OnInit {
  reaction: Reaction;
  relatedMetabolites: Array<any>;

  constructor(private rea: ReactionService, private route: ActivatedRoute) {
    this.reaction = new Reaction();
    this.relatedMetabolites = new Array<any>();
  };

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.loadData(params['reactionId']);
    });
  }

  loadData(reactionId) {
    //  Adam gibi bir tanesi load add sonra digerini load edersin
    this.rea.getReaction(reactionId).subscribe(data => {
      this.reaction = data;
      this.rea.getRelatedMetabolites(reactionId)
        .subscribe(data => this.relatedMetabolites = data['metabolites']); // TODO: change api
    });
  }

}

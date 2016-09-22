import { Injectable } from '@angular/core';
import {RelatedMetabolite, RelatedReaction, Metabolite, Reaction} from '../../../metabol.search-engine/models';
import {FbaNode, FbaLink} from '../../models';

@Injectable()
export class RelatedToVisualizationService {

  constructor() { }

  visualRelatedReactions(reaction: Metabolite, related: RelatedReaction[]): [FbaNode[], FbaLink[]] {
    return;
  }

  // private createNode(related: Metabolite | Reaction): FbaNode {
  //   // return {
  //   //   id:
  //   // }
  // }


  private createLink() {

  }
}

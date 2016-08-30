import { Injectable } from '@angular/core';
import {RelatedMetabolite, RelatedReaction } from '../../models/relateds';
import {FbaNode, FbaLink} from '../../models/fbaiteration';

@Injectable()
export class ServiceService {

  visualize(bioItem: RelatedMetabolite | RelatedReaction) {
    if (bioItem instanceof RelatedMetabolite)
      return this.visualizeRelatedMetabolite(bioItem);
    else if (bioItem instanceof RelatedReaction)
      return this.visualizeRelatedReaction(bioItem);
  }

  visualizeRelatedMetabolite(metabolite: RelatedMetabolite) {
    let nodes: FbaNode[] = [];
  }

  visualizeRelatedReaction(reaction: RelatedReaction) {

  }

  createFbaNodeFromMetabolite(metabolite: RelatedMetabolite) {
    // let node: FbaNode = {
    //
    // };
  }

  createFbaNodeFromReaction(reaction: RelatedReaction) {

  }

}

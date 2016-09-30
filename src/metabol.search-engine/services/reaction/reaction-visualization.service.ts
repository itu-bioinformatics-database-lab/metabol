import { Injectable, Inject, forwardRef } from '@angular/core';
import {FbaNode, FbaLink} from '../../../metabol.visualizations/models';
import {Reaction, ConnectedMetabolite} from '../../models/reaction';
import {CurrencyMetabolitesService} from '../../../metabol.common/services';

/**
 *	This service map reactions and metabolite datatype
 *	into visualization models those are FbaNode and FbaLink
 *	Also add color to nodes for visualization
 */
@Injectable()
export class ReactionVisualizationService {

  /**
   * Dependies injection of service into service not working
   * @type {CurrencyMetabolitesService}
   */
  private cur: CurrencyMetabolitesService;

  constructor() {
    this.cur = new CurrencyMetabolitesService();
  }

  private createFbaLink(stoichiometry: number, metaboliteId: number, reactionId: number): FbaLink {
    if (stoichiometry > 0)
      return { source: metaboliteId, target: reactionId, role: 's', stoichiometry: stoichiometry };
    return { source: reactionId, target: metaboliteId, role: 'p', stoichiometry: stoichiometry };
  }

  convertToFbaNode(reaction: Reaction, connectedMetabolites): Array<FbaNode> {
    let fbaNodes = new Array<FbaNode>();
    let idCounter = 0;

    fbaNodes.push({
      id: idCounter++, name: reaction.id, type: 'r', index: 0, color: '#003fff'
    });

    for (let m of connectedMetabolites) {
      if (m.stoichiometry == 1)
        fbaNodes.push({
          id: idCounter++, name: m.id, type: 'm', index: 0, color: '#ff0000'
        });
      else
        fbaNodes.push({
          id: idCounter++, name: m.id, type: 'm', index: 0, color: '#7fff00'
        });
    }

    // To different loop requert to know nodes ids.
    for (let m of connectedMetabolites)
      if (!this.cur.isCurrency(m.id))
        for (let r of m.reactions)
          fbaNodes.push({
            id: idCounter++, name: r.id, type: 'r', index: 0, color: '#999'
          });

    return fbaNodes;
  }

  convertToFbaLink(reaction: Reaction, connectedMetabolites): Array<FbaLink> {
    let fbaLinks = new Array<FbaLink>();
    let idCounter = 1;

    for (let m of connectedMetabolites) {
      fbaLinks.push(this.createFbaLink(m.stoichiometry, idCounter++, 0));
    }

    let mid = 1;
    for (let m of connectedMetabolites) {
      if (!this.cur.isCurrency(m.id))
        for (let r of m.reactions)
          // Be carefull there is -r.stoichiometry beacuse it is stoichiometry of reaction
          fbaLinks.push(this.createFbaLink(-r.stoichiometry, mid, idCounter++));
      mid++;
    }
    return fbaLinks;
  }

  convertToFbaVisualization(
    reaction: Reaction,
    connectedMetabolites): [FbaNode[], FbaLink[]] {
    return [
      this.convertToFbaNode(reaction, connectedMetabolites),
      this.convertToFbaLink(reaction, connectedMetabolites)
    ]
  }
}

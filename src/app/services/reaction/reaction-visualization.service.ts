import { Injectable, Inject, forwardRef } from '@angular/core';
import {FbaNode, FbaLink} from '../../models/fbaiteration';
import {Reaction, ConnectedMetabolite} from '../../models/reaction';
import {IdenticalByHalf} from '../../modules/colorization';
import {CurrencyMetabolitesService} from '../currency-metabolites/currency-metabolites.service';

/**
 *	This service map reactions and metabolite datatype
 *	into visualization models those are FbaNode and FbaLink
 *	Also add color to nodes for visualization
 */
@Injectable()
export class ReactionVisualizationService {

  /**
   * colorization algorithim
   * @type {IdenticalByHalf}
   */
  private identicalByHalf: IdenticalByHalf;

  /**
   * Dependies injection of service into service not working
   * @type {CurrencyMetabolitesService}
   */
  private cur: CurrencyMetabolitesService;

  constructor() {
    this.identicalByHalf = new IdenticalByHalf();
    this.cur = new CurrencyMetabolitesService();
  }

  /**
   * Create Fba Node and add color to node.
   */
  private createFbaNode(id: number, name: string, type: string, color: string): FbaNode {
    return {
      id: id,
      name: name,
      type: type,
      index: 0,
      color: color
    };
  }

  private createFbaLink(stoichiometry: number, metaboliteId: number, reactionId: number) {
    if (stoichiometry > 0)
      return { source: metaboliteId, target: reactionId, role: 's' };
    return { source: reactionId, target: metaboliteId, role: 'p' };
  }

  convertToFbaNode(reaction: Reaction, connectedMetabolites: ConnectedMetabolite[]): Array<FbaNode> {
    let fbaNodes = new Array<FbaNode>();
    let idCounter = 0;

    fbaNodes.push(this.createFbaNode(idCounter++, reaction.id, 'r', '#003fff'));

    for (let m of connectedMetabolites) {
      if (m.stoichiometry == 1)
        fbaNodes.push(this.createFbaNode(idCounter++, m.id, 'm', '#ff0000'));
      else
        fbaNodes.push(this.createFbaNode(idCounter++, m.id, 'm', '#7fff00'));
    }

    // To different loop requert to know nodes ids.
    for (let m of connectedMetabolites)
      if (!this.cur.isCurrency(m.id))
        for (let r of m.reactions)
          fbaNodes.push(this.createFbaNode(idCounter++, r.id, 'r', '#999'));

    return fbaNodes;
  }

  convertToFbaLink(reaction: Reaction, connectedMetabolites: ConnectedMetabolite[]): Array<FbaLink> {
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
    connectedMetabolites: ConnectedMetabolite[]): [FbaNode[], FbaLink[]] {
    return [
      this.convertToFbaNode(reaction, connectedMetabolites),
      this.convertToFbaLink(reaction, connectedMetabolites)
    ]
  }
}

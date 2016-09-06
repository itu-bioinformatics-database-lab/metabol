import { Injectable, Inject, forwardRef } from '@angular/core';
import {FbaNode, FbaLink} from '../../../visualizations/models';
import {Metabolite, RelatedReactions} from '../../models/metabolite';
import {CurrencyMetabolitesService} from '../../../common/services';

/**
 *	This service map reactions and metabolite datatype
 *	into visualization models those are FbaNode and FbaLink
 *	Also add color to nodes for visualization
 */
@Injectable()
export class MetaboliteVisualizationService {

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

  convertToFbaNode(metabolite: Metabolite, relatedReactions: Array<any>): Array<FbaNode> {
    let fbaNodes = new Array<FbaNode>();
    let idCounter = 0;

    fbaNodes.push({
      id: idCounter++, name: metabolite.id, type: 'm', index: 0, color: '#003fff'
    });

    for (let r of relatedReactions) {
      if (-r.stoichiometry == 1)
        fbaNodes.push({
          id: idCounter++, name: r.id, type: 'r', index: 0, color: '#ff0000'
        });
      else
        fbaNodes.push({
          id: idCounter++, name: r.id, type: 'r', index: 0, color: '#7fff00'
        });
    }


    // To different loop requert to know nodes ids.
    for (let r of relatedReactions)
      if (!this.cur.isCurrency(r.id))
        for (let m of r.metabolites)
          fbaNodes.push({
            id: idCounter++, name: m.id, type: 'm', index: 0, color: '#999'
          });

    return fbaNodes;
  }

  convertToFbaLink(metabolite: Metabolite, relatedReactions: Array<any>): Array<FbaLink> {
    let fbaLinks = new Array<FbaLink>();
    let idCounter = 1;

    for (let r of relatedReactions)
      fbaLinks.push(this.createFbaLink(r.stoichiometry, 0, idCounter++));


    let rid = 1;
    for (let r of relatedReactions) {
      if (!this.cur.isCurrency(r.id))
        for (let m of r.metabolites)
          fbaLinks.push(this.createFbaLink(m.stoichiometry, idCounter++, rid));
      rid++;
    }
    return fbaLinks;
  }

  convertToFbaVisualization(
    metabolite: Metabolite,
    relatedReactions): [FbaNode[], FbaLink[]] {
    return [
      this.convertToFbaNode(metabolite, relatedReactions),
      this.convertToFbaLink(metabolite, relatedReactions)
    ]
  }
}

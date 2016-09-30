import {CurrencyMetabolitesService} from "../../../metabol.common/services/";
import { Injectable } from '@angular/core';
import {RelatedMetabolite, RelatedReaction, Metabolite, Reaction} from '../../../metabol.search-engine/models';
import {FbaNode, FbaLink, SubsystemNode} from '../../models';
import * as _ from 'lodash';

@Injectable()
export class RelatedToVisualizationService {

  private subsystems: { [key: string]: SubsystemNode };
  private metabolites: { [key: string]: FbaNode };
  private reactions: { [key: string]: FbaNode };
  private links: FbaLink[];
  private cur: CurrencyMetabolitesService;

  constructor() {
    this.cur = new CurrencyMetabolitesService();

    this.subsystems = {};
    this.metabolites = {};
    this.reactions = {};
    this.links = [];
  }

  /**
   * [getDataAndClean description]
   * @return {[type]} [description]
   */
  private getDataAndClean(): [FbaNode[], FbaLink[]] {
    let nodes = _.values(this.subsystems)
      .concat(_.values(this.metabolites))
      .concat(_.values(this.reactions));
    let links = this.links;
    this.constructor();
    return [nodes, links];
  }

  /**
   * [createReactionIfDoNotExits description]
   * @param  {RelatedReaction} related [description]
   * @return {[type]}                  [description]
   */
  private createReactionIfDoNotExits(related: RelatedReaction) {
    if (!(related.id in this.reactions))
      this.reactions[related.id] = { name: related.id, type: 'r' };
  }

  /**
   * [createMetaboliteIfDoNotExits description]
   * @param  {RelatedMetabolite} related [description]
   * @return {[type]}                    [description]
   */
  private createMetaboliteIfDoNotExits(related: RelatedMetabolite) {
    if (!(related.id in this.metabolites))
      this.metabolites[related.id] = { name: related.id, type: 'm' };
  }

  /**
   * [visualizeMetaboliteDetail description]
   * @param  {Metabolite}        metabolite [description]
   * @param  {RelatedReaction[]} relateds   [description]
   * @return {[type]}                       [description]
   */
  visualizeMetaboliteDetail(metabolite: Metabolite, relateds: RelatedReaction[]): [FbaNode[], FbaLink[]] {
    let relatedMetabolite: RelatedMetabolite = {
      id: metabolite.id,
      name: metabolite.name,
      stoichiometry: relateds[0].stoichiometry,
      reactions: relateds
    };
    return this.visualizeRelatedMetabolites(relatedMetabolite);
  }

  /**
   * [visualizeRelatedReactions description]
   * @param  {RelatedReaction} related [description]
   * @return {[type]}                  [description]
   */
  visualizeRelatedReactions(related: RelatedReaction): [FbaNode[], FbaLink[]] {
    this.createReactionIfDoNotExits(related);
    this.visualizeRelatedReaction(related);
    return this.getDataAndClean();
  }

  /**
   * [visualizeRelatedMetabolites description]
   * @param  {RelatedMetabolite} related [description]
   * @return {[type]}                    [description]
   */
  visualizeRelatedMetabolites(related: RelatedMetabolite): [FbaNode[], FbaLink[]] {
    this.createMetaboliteIfDoNotExits(related);
    this.createLinkForInitialMetabolite(related);
    this.visualizeRelatedMetabolite(related);
    return this.getDataAndClean();
  }

  /**
   * [createLinkForInitialMetabolite description]
   * @param  {RelatedMetabolite} related [description]
   * @return {[type]}                    [description]
   */
  private createLinkForInitialMetabolite(related: RelatedMetabolite) {
    for (let r of related.reactions) {
      this.createReactionIfDoNotExits(r);
      this.createLinkFromRelatedMetabolite(related, r.id, related.id);
      this.createSubsystem(r);
      this.createLinkForSubsystem(r.subsystem, related.id);
    }
  }

  /**
   * [visualizeRelatedReaction description]
   * @param  {FbaNode}         node    [description]
   * @param  {RelatedReaction} related [description]
   * @return {[type]}                  [description]
   */
  private visualizeRelatedReaction(related: RelatedReaction) {
    for (let m of related.metabolites || []) {
      this.createMetaboliteIfDoNotExits(m);
      this.createLinkFromRelatedMetabolite(m, related.id, m.id);
      this.visualizeRelatedMetabolite(m);
      if (this.isBorderMetabolite(related, m))
        this.createLinkForSubsystem(related.subsystem, m.id);
    }
  }

  /**
   * [visualizeRelatedMetabolite description]
   * @param  {FbaNode}           node    [description]
   * @param  {RelatedMetabolite} related [description]
   * @return {[type]}                    [description]
   */
  private visualizeRelatedMetabolite(related: RelatedMetabolite) {
    if (this.cur.isCurrency(related.id)) return;

    for (let r of related.reactions || []) {
      this.createReactionIfDoNotExits(r);
      this.createLinkFromRelatedMetabolite(related, r.id, related.id);
      this.createSubsystem(r);
      this.visualizeRelatedReaction(r);

      if (!r.metabolites)
        this.createLinkForSubsystem(r.subsystem, related.id);

    }
  }

  /**
   * [createLinkFromRelatedMetabolite description]
   * @param  {RelatedMetabolite} related        [description]
   * @param  {FbaNode}           reactionNode   [description]
   * @param  {FbaNode}           metaboliteNode [description]
   * @return {FbaLink}                          [description]
   */
  private createLinkFromRelatedMetabolite(related: RelatedMetabolite, reactionId: string, metaboliteId: string) {
    let link: FbaLink;
    if (related.stoichiometry > 0)
      link = { source: this.reactions[reactionId], target: this.metabolites[metaboliteId], role: 'p' };
    else
      link = { source: this.metabolites[metaboliteId], target: this.reactions[reactionId], role: 's' };
    link.stoichiometry = related.stoichiometry;
    this.links.push(link);
  }

  private createLinkForSubsystem(subsystemId: string, metaboliteId: string) {
    this.links.push({ source: this.subsystems[subsystemId], target: this.metabolites[metaboliteId], role: 'sub' });
  }

  /**
   * [createSubsystem description][getDataAndClean description]
   * @param  {[type]} reaction [description]
   * @return {[type]}          [description]
   */
  private createSubsystem(related: RelatedReaction) {
    if (related.subsystem in this.subsystems)
      this.subsystems[related.subsystem].reactions.push(this.reactions[related.id]);
    else
      this.subsystems[related.subsystem] = { name: related.subsystem, type: 'sub', reactions: [] };
  }

  /**
   * [isBorderMetabolite description]
   * @param  {RelatedReaction}   relatedReaction   [description]
   * @param  {RelatedMetabolite} relatedMetabolite [description]
   * @return {[type]}                              [description]
   */
  private isBorderMetabolite(relatedReaction: RelatedReaction, relatedMetabolite: RelatedMetabolite) {
    for (let r of relatedMetabolite.reactions || [])
      if (r.subsystem != relatedReaction.subsystem)
        return true;
    return false;
  }

}

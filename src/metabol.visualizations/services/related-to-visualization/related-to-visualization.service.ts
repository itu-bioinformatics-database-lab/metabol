import { Injectable } from '@angular/core';
import {RelatedMetabolite, RelatedReaction, Metabolite, Reaction} from '../../../metabol.search-engine/models';
import {FbaNode, FbaLink} from '../../models';

@Injectable()
export class RelatedToVisualizationService {

  constructor() { }

  visualizeRelatedReactions(related: RelatedReaction) {
    let nodes: FbaNode[] = [{ name: related.name, type: 'r' }];
    let links: FbaLink[] = [];
    let child = this.visualizeRelatedReaction(nodes[0], related);
    return [nodes.concat(child[0]), links.concat(child[1])];
  }

  visualizeRelatedMetabolites(related: RelatedMetabolite) {
    let nodes: FbaNode[] = [{ name: related.name, type: 'm' }];
    let links: FbaLink[] = [];
    let child = this.visualizeRelatedMetabolite(nodes[0], related);
    return [nodes.concat(child[0]), links.concat(child[1])];
  }

  private visualizeRelatedReaction(node: FbaNode, related: RelatedReaction): [FbaNode[], FbaLink[]] {
    let links: FbaLink[] = [], nodes: FbaNode[] = [], mnode: FbaNode;
    for (let m of related.metabolites || []) {
      console.log('related');
      mnode = { name: m.name, type: 'm' };
      nodes.push(mnode);
      links.push(this.createLinkFromRelatedMetabolite(m, node, mnode));
      let child = this.visualizeRelatedMetabolite(mnode, m);
      nodes = nodes.concat(child[0]);
      links = links.concat(child[1]);
    }
    return [nodes, links];
  }

  private visualizeRelatedMetabolite(node: FbaNode, related: RelatedMetabolite): [FbaNode[], FbaLink[]] {
    let links: FbaLink[] = [], nodes: FbaNode[] = [], rnode: FbaNode;
    for (let r of related.reactions || []) {
      rnode = { name: r.name, type: 'r' };
      nodes.push(rnode);
      links.push(this.createLinkFromRelatedMetabolite(related, rnode, node));
      let child = this.visualizeRelatedReaction(rnode, r);
      nodes = nodes.concat(child[0]);
      links = links.concat(child[1]);
    }
    return [nodes, links];
  }

  private createLinkFromRelatedMetabolite(related: RelatedMetabolite, reactionNode: FbaNode, metaboliteNode: FbaNode): FbaLink {
    let link: FbaLink;
    if (related.stoichiometry > 0)
      link = { source: reactionNode, target: metaboliteNode, role: 'p' };
    else
      link = { source: metaboliteNode, target: reactionNode, role: 's' };
    link.stoichiometry = related.stoichiometry;
    return link;
  }

}

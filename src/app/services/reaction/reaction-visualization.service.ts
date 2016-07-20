import { Injectable } from '@angular/core';
import {FbaNode, FbaLink} from '../../models/fbaiteration';
import {Reaction, ConnectedMetabolite} from '../../models/reaction';
import {IdenticalByHalf} from '../../modules/colorization';

@Injectable()
export class ReactionVisualizationService {

  identicalByHalf: IdenticalByHalf;

  constructor() {
    this.identicalByHalf = new IdenticalByHalf();
  }

  convertToFbaNode(reaction: Reaction, connectedMetabolites: ConnectedMetabolite[]): Array<FbaNode> {
    let fbaNodes = new Array<FbaNode>();

    for (let i = 0; i < connectedMetabolites.length; i++) {
      let node: FbaNode = {
        id: i,
        name: connectedMetabolites[i].id,
        type: 'm',
        index: 0,
        color: this.identicalByHalf.next()
      };
      fbaNodes.push(node);
    }

    let node: FbaNode = {
      id: connectedMetabolites.length,
      name: reaction.id,
      type: 'r',
      index: 0,
      color: this.identicalByHalf.next()
    };

    fbaNodes.push(node);
    return fbaNodes;
  }

  convertToFbaLink(reaction: Reaction, connectedMetabolites: ConnectedMetabolite[]): Array<FbaLink> {
    let fbaLinks = new Array<FbaLink>();

    for (let i = 0; i < connectedMetabolites.length; i++) {
      let link: FbaLink;
      if (connectedMetabolites[i].stoichiometry > 0)
        link = {
          source: i,
          target: connectedMetabolites.length,
          role: 's'
        };
      else
        link = {
          source: connectedMetabolites.length,
          target: i,
          role: 'p'
        };

      fbaLinks.push(link);
    }

    return fbaLinks;
  }

  convertToFbaVisualization(
    reaction: Reaction,
    connectedMetabolites: ConnectedMetabolite[]): [FbaNode[], FbaLink[]] {
    this.constructor();
    return [
      this.convertToFbaNode(reaction, connectedMetabolites),
      this.convertToFbaLink(reaction, connectedMetabolites)
    ]
  }
}

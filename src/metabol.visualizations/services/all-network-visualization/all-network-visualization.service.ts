import { Injectable } from '@angular/core';
import {SubsystemNode, FbaLink, FbaNode} from '../../models';
import * as _ from 'lodash';

@Injectable()
export class AllNetworkVisualizationService {

  private subsystems: { [key: string]: SubsystemNode };
  private metabolites: { [key: string]: FbaNode };
  links: Array<FbaLink>;

  private getOrCreateMetabolite(name: string) {
    if (!(name in this.metabolites))
      this.metabolites[name] = { name: name, type: 'r' };
    return this.metabolites[name];
  }

  private getOrCreateSubsystem(name: string) {
    if (!(name in this.subsystems))
      this.subsystems[name] = { name: name, type: 'sub', reactions: [] };
    return this.subsystems[name];
  }

  private createLink(subsystemName: string, metaboliteName: string) {
    this.links.push({
      source: this.subsystems[subsystemName],
      target: this.metabolites[metaboliteName], role: 'sub'
    });
  }

  /**
   * Loads all metabolic network from localStorage
   */
  load(): void {
    let collection = 'subsystem-network';
    let data = JSON.parse(localStorage.getItem(collection));

    for (let i of data) {
      // TODO: Arrow direction
      this.createLink(i["subsystemSource"], i["borderMetaboliteId"]);
      this.createLink(i["subsystemTarget"], i["borderMetaboliteId"]);
    }
  }

  get(): [FbaNode[], FbaLink[]] {
    let nodes = [
      ..._.values(this.subsystems),
      ..._.values(this.metabolites)
    ];
    return [nodes, this.links];
  }

}

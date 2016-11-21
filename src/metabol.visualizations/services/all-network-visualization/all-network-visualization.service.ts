import { Injectable } from '@angular/core';
import {SubsystemNode, FbaLink, FbaNode} from '../../models';
import * as _ from 'lodash';

@Injectable()
export class AllNetworkVisualizationService {

  private subsystems: { [key: string]: SubsystemNode } = {};
  private metabolites: { [key: string]: FbaNode } = {};
  private links: Array<FbaLink> = [];

  /**
   * Checks metabolite already create and stored in service
   * otherwise it create one and store
   * @param  {string} name name of metabolite
   * @return {FbaNode}
   */
  private getOrCreateMetabolite(name: string): FbaNode {
    if (!(name in this.metabolites))
      this.metabolites[name] = { name: name, type: 'm' };
    return this.metabolites[name];
  }

  /**
   * Checks subsystem already create and stored in service
   * otherwise it create one and store
   * @param  {string}        name name of metabolite
   * @return {SubsystemNode}
   */
  private getOrCreateSubsystem(name: string): SubsystemNode {
    if (!(name in this.subsystems))
      this.subsystems[name] = { name: name, type: 'sub', reactions: [] };
    return this.subsystems[name];
  }

  /**
   * Creates link for subsystem and border metabolite
   * @param  {string} subsystemName  name of subsystem
   * @param  {string} metaboliteName name of metabolite
   */
  private createLink(subsystemName: string, metaboliteName: string) {
    this.links.push({
      source: this.getOrCreateSubsystem(subsystemName),
      target: this.getOrCreateMetabolite(metaboliteName), role: 'sub'
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

  /**
   * [get description]
   * @return {[type]} [description]
   */
  get(): [FbaNode[], FbaLink[]] {
    let nodes = [
      ..._.values(this.subsystems),
      ..._.values(this.metabolites)
    ];
    let links = this.links;

    this.subsystems = {};
    this.metabolites = {};
    this.links = [];

    return [nodes, links];
  }

}

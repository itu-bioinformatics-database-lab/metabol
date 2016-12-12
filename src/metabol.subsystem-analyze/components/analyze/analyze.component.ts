import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';

import * as d3 from 'd3';
import * as _ from 'lodash';

import {SubsystemTreeNode, SubsystemTreeNodeType} from '../../models';
import {MetaboliteConcentration} from "../../models/metaboliteConcentration";
import {SubsystemAnalyzeService} from "../../services/subsystem-analyze/subsystem-analyze.service";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-subsystem-analyze',
  templateUrl: 'analyze.component.html',
  styleUrls: ['analyze.component.css'],
  providers: [SubsystemAnalyzeService],
})
export class AnalyzeComponent implements OnInit {

  solutionRoot: SubsystemTreeNode;
  solutions = {};

  nodes: SubsystemTreeNode[] = [];
  links: any[] = [];
  tree: d3.layout.Tree<SubsystemTreeNode>;
  lines: any[];
  diagonal = d3.svg.diagonal();

  subsystemNameActivation: { [name: string]: number } = {};
  inactiveSubsystems: Array<string> = [];
  SubsystemTreeNodeType = SubsystemTreeNodeType;

  constructor(
    private analyze: SubsystemAnalyzeService,
    private route: ActivatedRoute) {
    this.tree = d3.layout.tree<SubsystemTreeNode>();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.analyze.getSolution(params['key'], (data) => {
        this.solutions = data;
        this.solutionRoot = this.analyze.getSolutionTree(data);
        this.nodes = this.tree.nodes(this.solutionRoot);
        this.links = this.tree.links(this.nodes);
        this.filterNode().forEach(name => {
          this.subsystemNameActivation[name] = 2;
        });
      });
    });

  }

  activationChange(subsystem, active) {
    let nds = this.nodes.filter(n => n.name == subsystem);
    if (active == 0) {
      nds.forEach(n => this.activateNode(n));
      this.inactiveSubsystems = _.without(this.inactiveSubsystems, subsystem);
    }
    else if (active == 1) {
      nds.forEach(n => {
        this.subsystemNameActivation[n.name] = 1;
        this.deactivateNode(n)
      });
      this.inactiveSubsystems.push(subsystem);
      this.inactiveSubsystems = this.inactiveSubsystems.slice();
    }
    console.log(this.inactiveSubsystems);
  }

  activationChangeOnTree(node = this.nodes[0]) {
    if (this.subsystemNameActivation[node.name] != 1) {
      node.active = true;
      if (node.children) node.children.forEach(x => this.activationChangeOnTree(x));
    }
  }

  deactivateNode(node: SubsystemTreeNode) {
    node.active = false;
    if (node.children) node.children.forEach(x => this.deactivateNode(x));
  }

  activateNode(node: SubsystemTreeNode) {
    let parent = <SubsystemTreeNode>node.parent;
    if (parent.active) {
      node.active = true;
      this.subsystemNameActivation[node.name] = 0;
    }
    this.activationChangeOnTree();
  }

  filterNode() {
    let names = [];
    if (this.nodes)
      this.nodes.filter(x => x.type == SubsystemTreeNodeType.Pathway)
        .forEach(n => {
          names.push(n.name);
        });
    return _.uniq(names);
  }

  filterSolution(nodes: SubsystemTreeNode[]) {
    if (nodes)
      return nodes.filter(x => x.type == SubsystemTreeNodeType.Solution);
  }

  getParentByActivation(solution: SubsystemTreeNode, activation: boolean, parents?: Array<string>) {
    let parent = <SubsystemTreeNode>solution.parent;
    if (!parents)
      parents = new Array<string>();
    if (parent.type != SubsystemTreeNodeType.All) {
      if (parent.active == activation)
        parents.push(parent.name);
      return this.getParentByActivation(parent, activation, parents);
    }
    return parents;
  }

  highlight($event) {
    // TODO: Fix tih line
    let solution = this.nodes.find(s => s.name == $event);
    if (solution) {
      this.dehighlightAll();
      this.highlightPath(solution);
    }
  }

  highlightPath(solution: SubsystemTreeNode) {
    let parent = <SubsystemTreeNode>solution.parent;
    solution.highlight = true;
    if (parent.type != SubsystemTreeNodeType.All)
      this.highlightPath(parent)
    else
      parent.highlight = true;
  }

  dehighlightAll() {
    for (let n of this.nodes) {
      n.highlight = false;
    }
  }

}

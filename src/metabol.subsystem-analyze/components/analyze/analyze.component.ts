import {SubsystemAnalyzeService} from "../../services/subsystem-analyze/subsystem-analyze.service";
import { Component, OnInit, ViewChild } from '@angular/core';

import * as d3 from 'd3';
import * as _ from 'lodash';

import {SubsystemTreeNode, SubsystemTreeNodeType} from '../../models/subsystem';
import {FullScreenableSvgComponent} from '../../../metabol.visualizations/components';
import {MetaboliteConcentration} from "../../models/metaboliteConcentration";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-subsystem-analyze',
  templateUrl: 'analyze.component.html',
  styleUrls: ['analyze.component.css'],
  providers: [SubsystemAnalyzeService],
})
export class AnalyzeComponent implements OnInit {

  @ViewChild(FullScreenableSvgComponent) fullSvg: FullScreenableSvgComponent;

  nodes: SubsystemTreeNode[];
  links: any[];
  tree: d3.layout.Tree<SubsystemTreeNode>;
  lines: any[];
  diagonal = d3.svg.diagonal();

  subsystemNameActivation: { [name: string]: number };
  SubsystemTreeNodeType = SubsystemTreeNodeType;

  constructor(private analyze: SubsystemAnalyzeService, private route: ActivatedRoute) {
    this.tree = d3.layout.tree<SubsystemTreeNode>()
      .size([4000, 1500])
      .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

    this.subsystemNameActivation = {};
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.analyze.getSolution(params['key'], (data) => {
        let solutionTree = this.analyze.getSolutionTree(data);
        this.nodes = this.tree.nodes(solutionTree);
        this.links = this.tree.links(this.nodes);
        this.filterNode().forEach(name => {
          this.subsystemNameActivation[name] = 2;
        });
      });
    });

    this.fullSvg.translate = [400, 200];
  }

  nodeColor(node: SubsystemTreeNode) {
    if (node.active)
      return node.type == SubsystemTreeNodeType.Pathway ? '#3be614' : 'red';
    return "rgba(0,0,0,0.2)";
  }

  linkColor(nodeSource: SubsystemTreeNode) {
    if (nodeSource.active)
      return '#777';
    return "rgba(0,0,0,0.2)";
  }

  activationChange(subsystem, active) {
    let nds = this.nodes.filter(n => n.name == subsystem);
    if (active == 0) {
      nds.forEach(n => this.activateNode(n));
    }
    else if (active == 1)
      nds.forEach(n => {
        this.subsystemNameActivation[n.name] = 1;
        this.deactivateNode(n)
      });
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
    node.active = true;
    this.subsystemNameActivation[node.name] = 0;
    let parent = <SubsystemTreeNode>node.parent;

    while (this.subsystemNameActivation[parent.name] == 1) {
      this.subsystemNameActivation[parent.name] = 2;
      node = parent;
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

  filterHighlight(nodes: SubsystemTreeNode[]) {
    if (nodes)
      return nodes.filter(x => x.highlight);
  }

  filterHighlightLink(links) {
    if (links)
      return links.filter(x => x.target.highlight);
  }

  highlight(solution: SubsystemTreeNode) {
    this.dehighlightAll();
    this.highlightPath(solution);
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

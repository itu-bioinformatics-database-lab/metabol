import { Component, OnChanges, Input } from '@angular/core';

import * as d3 from 'd3';

import {SubsystemTreeNode, SubsystemTreeNodeType} from '../../models';
import {ActivatedRoute} from '@angular/router';
import {SubsystemAnalyzeService} from "../../services/subsystem-analyze/subsystem-analyze.service";


@Component({
  selector: 'tree-visualization',
  templateUrl: './tree-visualization.component.html',
  styleUrls: ['./tree-visualization.component.css']
})
export class TreeVisualizationComponent implements OnChanges {

  @Input() root: SubsystemTreeNode;

  nodes: SubsystemTreeNode[] = [];
  links: any[] = [];

  tree: d3.layout.Tree<SubsystemTreeNode>;
  lines: any[];
  diagonal = d3.svg.diagonal();

  constructor(
    private analyze: SubsystemAnalyzeService,
    private route: ActivatedRoute) {
    this.tree = d3.layout.tree<SubsystemTreeNode>()
      .size([4000, 1500])
      .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);
  }

  ngOnChanges() {
    if (this.root) {
      this.nodes = this.tree.nodes(this.root);
      this.links = this.tree.links(this.nodes);
    }
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

  filterHighlight(nodes: SubsystemTreeNode[]) {
    if (nodes)
      return nodes.filter(x => x.highlight);
  }

  filterHighlightLink(links) {
    if (links)
      return links.filter(x => x.target.highlight);
  }

}

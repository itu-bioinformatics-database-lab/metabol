import {SubsystemAnalyzeService} from "../../services/subsystem-analyze/subsystem-analyze.service";
import { Component, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3'
import {SubsystemTreeNode, SubsystemTreeNodeType} from '../../models/subsystem';
import {FullScreenableSvgComponent} from '../fullscreenable-svg/fullscreenable-svg.component';


@Component({
  moduleId: module.id,
  selector: 'app-subsystem-analyze',
  templateUrl: 'subsystem-analyze.component.html',
  styleUrls: ['subsystem-analyze.component.css'],
  providers: [SubsystemAnalyzeService],
  directives: [FullScreenableSvgComponent]
})
export class SubsystemAnalyzeComponent implements OnInit {

  @ViewChild(FullScreenableSvgComponent) fullSvg: FullScreenableSvgComponent;

  data: any;
  solutionTree: any;
  nodes: any;
  links: any;
  tree: d3.layout.Tree<SubsystemTreeNode>;
  lines: any;

  SubsystemTreeNodeType = SubsystemTreeNodeType;

  constructor(private analyze: SubsystemAnalyzeService) {
    this.tree = d3.layout.tree<SubsystemTreeNode>()
      .size([1000, 400]);
  }

  ngOnInit() {
    this.analyze.getSolutions("myname", [], (data) => {
      this.data = data;
      let solutionTree = this.analyze.getSolutionTree(this.data);
      this.nodes = this.tree.nodes(solutionTree);
      this.links = this.tree.links(this.nodes);
    });

    this.fullSvg.translate = [1, 10];
  }

  onResize() {

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

  activationChange(nodeSource: SubsystemTreeNode, active) {
    if (active) this.activateNode(nodeSource);
    else this.deactivateNode(nodeSource);
  }

  deactivateNode(node: SubsystemTreeNode) {
    node.active = false;
    if (node.type == SubsystemTreeNodeType.Pathway)
      node.children.forEach(x => {
        this.deactivateNode(x);
      });
  }

  activateNode(node: SubsystemTreeNode) {
    node.active = true;
    if (node.type == SubsystemTreeNodeType.Pathway)
      this.activateNode(<SubsystemTreeNode>node.parent)
    node.children.forEach(x => {
      if (x.type == SubsystemTreeNodeType.Solution)
        x.active = true
    });
  }

  filterNode(nodes: SubsystemTreeNode[]) {
    if (nodes)
      return nodes.filter(x => x.type == SubsystemTreeNodeType.Pathway);
  }

}

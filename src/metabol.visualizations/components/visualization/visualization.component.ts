import { Component, Input, EventEmitter, Output, OnChanges, OnInit, ElementRef, ViewChild} from '@angular/core';
import {FbaNode, FbaLink, SubsystemNode} from '../../models/fbaiteration';
import * as d3 from 'd3';
import {ActivatedRoute} from '@angular/router';
import {FullScreenableSvgComponent} from '../fullscreenable-svg/fullscreenable-svg.component';
import {Location} from '@angular/common';

@Component({
  selector: 'visualization',
  templateUrl: 'visualization.component.html',
  styleUrls: ['visualization.component.css'],
})
export class VisualizationComponent implements OnChanges {

  @Input() nodes: Array<FbaNode>;
  @Input() links: Array<FbaLink>;
  @Input() searchTerm: string;
  @Input() currentIteration: Number;
  @ViewChild(FullScreenableSvgComponent) fullSvg: FullScreenableSvgComponent;

  reactions: Array<FbaNode>;
  metabolites: Array<FbaNode>;
  subsystems: Array<SubsystemNode> = [];


  force: d3.layout.Force<FbaLink, FbaNode | SubsystemNode>;
  d3links: Array<FbaLink>;
  d3nodes: Array<FbaNode>;

  isFullScreen: Boolean;
  url: string;

  constructor(private elementRef: ElementRef, private location: Location) {

    this.searchTerm = "";
    this.force = this.initForce();
  }

  initForce() {
    return d3.layout.force<FbaLink, FbaNode>()
      .linkDistance(200)
      .charge(-10000)
      .size([1000, 400])
      .on('start', () => this.onForceStart())
      .on('tick', () => this.onForceTick());
  }

  onForceStart() {
    this.onForceTick();
    this.deactiveteAllReaction();
    this.deactiveAllMetabolite();
    this.updateMetabolitesActivation();
  }

  onForceTick() {
    this.reactions = this.force.nodes()
      .filter((x) => x['type'] == 'r');

    this.metabolites = this.force.nodes()
      .filter((x) => x['type'] == 'm');

    this.subsystems = this.force.nodes()
      .filter((x) => x['type'] == 'sub');

    this.d3links = this.force.links();
    this.d3nodes = this.force.nodes();
  }

  onResize() {
    this.force.size(this.fullSvg.getSizeOfSvg());
    this.force.start();
  }

  ngOnChanges() {
    this.force.stop();
    this.mapFluxValue();
    this.force.nodes(this.nodes).links(this.links);

    this.force.start();
    this.url = this.location.path();
  }

  searchInGraph(nodeName: String) {
    if (nodeName)
      if (nodeName.startsWith(this.searchTerm) || !this.searchTerm)
        return '#000';
    return '#ccc';
  }

  mapFluxValue() {
    this.nodes = this.nodes.map<FbaNode>((x) => {
      if (x.v)
        if (x.v > 1 || x.v < -1)
          x.v = Number(x.v.toFixed(1));
        else
          x.v = Number(x.v.toFixed(2));
      return x;
    });
  }

  linkColorByFlux(source: FbaNode, target: FbaNode) {
    let flux = this.fluxOfReactionOnLink(source, target);
    if (flux == 0) return "#c8c8c8";
    let r = Math.floor(Math.abs(221 - flux / 30.0));
    let g = Math.floor(Math.abs(221 - flux / 4.6));
    return `rgb(${r},${g},0)`;
  }

  strokeWidtByFlux(source: FbaNode, target: FbaNode) {
    let flux = this.fluxOfReactionOnLink(source, target);
    let strokeWidth = 1 + flux / 300;
    return `${strokeWidth}px`;
  }

  fluxOfReactionOnLink(source: FbaNode, target: FbaNode) {
    if (target.type == 'r')
      return target.v || 0;
    else if (source.type == 'r')
      return source.v || 0;
    return 0;
  }

  isLinkActive(link: FbaLink) {
    let source = <FbaNode>link.source, target = <FbaNode>link.target;
    if (target.type == 'r')
      return !target.deactive;
    else if (source.type == 'r')
      return !source.deactive;
    if (target.type == 'sub')
      return !target.deactive;
    else if (source.type == 'sub')
      return !source.deactive;
    return true;
  }

  activateReactions(subsystem: SubsystemNode) {
    subsystem.reactions.forEach(r => {
      r.deactive = false;
    });
  }

  activeteSubsystem(subsystem: SubsystemNode) {
    if (subsystem)
      subsystem.deactive = false;
    subsystem.reactions.forEach(r => {
      if (r)
        r.deactive = true;
    });
  }

  deactiveteAllReaction() {
    this.subsystems.forEach(s => this.activeteSubsystem(s));
  }

  deactiveAllMetabolite() {
    this.metabolites.forEach(x => x.deactive = true);
  }

  updateMetabolitesActivation() {
    this.links.forEach(l => {
      if (this.isLinkActive(l)) this.getMetaboliteFromLink(l).deactive = false;
    });
  }

  getMetaboliteFromLink(link) {
    let source = <FbaNode>link.source, target = <FbaNode>link.target;
    return target.type == 'r' || target.type == 'sub' ? source : target;
  }

  onSubsystemClick(subsystem: SubsystemNode){
    if (subsystem)
      subsystem.deactive = true;
    this.activateReactions(subsystem);
    this.updateMetabolitesActivation();
  }

}

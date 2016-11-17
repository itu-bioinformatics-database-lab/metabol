import { Component, Input, EventEmitter, Output, OnChanges, OnInit, ElementRef, ViewChild} from '@angular/core';
import {FbaNode, FbaLink, SubsystemNode} from '../../models/fbaiteration';
import * as d3 from 'd3';
import {ActivatedRoute} from '@angular/router';
import {FullScreenableSvgComponent} from '../fullscreenable-svg';
import {LinkComponent} from '../link';

import {Location} from '@angular/common';

@Component({
  selector: 'visualization',
  templateUrl: 'visualization.component.html',
  styleUrls: ['visualization.component.css'],
})
export class VisualizationComponent implements OnChanges {

  @Input() nodes: Array<FbaNode>;
  @Input() links: Array<FbaLink>;
  @ViewChild(FullScreenableSvgComponent) fullSvg: FullScreenableSvgComponent;
  @ViewChild(LinkComponent) linkCom: LinkComponent;

  reactions: Array<FbaNode>;
  metabolites: Array<FbaNode>;
  subsystems: Array<SubsystemNode> = [];

  force: d3.layout.Force<FbaLink, FbaNode | SubsystemNode>;
  d3links: Array<FbaLink>;
  d3nodes: Array<FbaNode>;

  isFullScreen: Boolean;
  url: string;

  constructor(private elementRef: ElementRef, private location: Location) {
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
    this.force.nodes(this.nodes).links(this.links);

    this.force.start();
    this.url = this.location.path();
  }

  deactiveteAllReaction() {
    this.subsystems.forEach(s => {
      s.deactive = false;
      s.reactions.forEach(r => { r.deactive = true });
    });
    this.updateMetabolitesActivation();
  }

  deactiveteAllSubsystem() {
    this.subsystems.forEach(s => {
      s.deactive = true;
      s.reactions.forEach(r => {
        r.deactive = false
      });
    });
    this.updateMetabolitesActivation();
  }

  isLinkActive(link: FbaLink) {
    let source = <FbaNode>link.source, target = <FbaNode>link.target;
    if (target.type == 'r')
      return !target.deactive;
    else if (source.type == 'r')
      return !source.deactive;
    else if (target.type == 'sub')
      return !target.deactive;
    else if (source.type == 'sub')
      return !source.deactive;
    return true;
  }

  updateMetabolitesActivation() {
    this.metabolites.forEach(x => x.deactive = true);
    this.links.forEach(l => {
      if (this.isLinkActive(l))
        this.getMetaboliteFromLink(l).deactive = false;
    });
  }

  getMetaboliteFromLink(link) {
    let source = <FbaNode>link.source, target = <FbaNode>link.target;
    return target.type == 'r' || target.type == 'sub' ? source : target;
  }

}

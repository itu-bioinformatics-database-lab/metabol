import { Component, Input, EventEmitter, Output, OnChanges, OnInit, ElementRef} from '@angular/core';
import {FbaNode, FbaLink} from '../../models/fbaiteration';
import * as d3 from 'd3';
import {ActivatedRoute} from '@angular/router';
import {FullScreenableSvgComponent} from '../fullscreenable-svg/fullscreenable-svg.component';
import {Location} from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'visualization',
  templateUrl: 'visualization.component.html',
  styleUrls: ['visualization.component.css'],
  directives: [FullScreenableSvgComponent]
})
export class VisualizationComponent implements OnChanges, OnInit {

  @Input() nodes: Array<FbaNode>;
  @Input() links: Array<FbaLink>;
  @Input() searchTerm: string;
  @Input() currentIteration: Number;

  reactions: Array<FbaNode>;
  metabolites: Array<FbaNode>;

  force: d3.layout.Force<FbaLink, FbaNode>;
  d3links: Array<FbaLink>;
  d3nodes: Array<FbaNode>;
  zoom: d3.behavior.Zoom<any>;
  scale: number;
  translate: Array<number>;

  isFullScreen: Boolean;
  url: string;

  constructor(private elementRef: ElementRef, private location: Location) {

    this.scale = 1;
    this.translate = [1, 1];
    this.searchTerm = "";
    this.force = this.initForce();
  }

  initForce() {
    return d3.layout.force<FbaLink, FbaNode>()
      .linkDistance(100)
      .charge(-1000)
      .size([1000, 400])
      .on('tick', () => this.onForceTick());
  }

  onForceTick() {
    this.reactions = this.force.nodes()
      .filter((x) => x['type'] == 'r');

    this.metabolites = this.force.nodes()
      .filter((x) => x['type'] == 'm');

    this.d3links = this.force.links();
    this.d3nodes = this.force.nodes();
  }

  ngOnInit() {
    this.zoom = d3.behavior.zoom()
      .scaleExtent([0.1, 10])
      .on('zoom', () => this.onZoom());

    d3.select(this.elementRef.nativeElement)
      .select('svg')
      .call(this.zoom);
  }

  onZoom() {
    this.scale = this.zoom.scale();
    this.translate = this.zoom.translate();
  }

  getSizeOfSvg(): [number, number] {
    let sizes = document.getElementsByTagName("svg")[0].getBoundingClientRect();
    return [sizes.width, sizes.height];
  }

  onResize() {
    this.force.size(this.getSizeOfSvg());
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
  }


}

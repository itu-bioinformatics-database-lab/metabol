import { Component,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

import * as d3 from 'd3';

import {FbaNode, FbaLink, SubsystemNode} from '../../models/fbaiteration';
import {LinkComponent} from '../link';
import * as _ from 'lodash';
import {FullScreenableSvgComponent} from '../fullscreenable-svg/fullscreenable-svg.component'

@Component({
  selector: 'core-visualization',
  templateUrl: './core-visualization.component.html',
  styleUrls: ['./core-visualization.component.css'],

})
export class CoreVisualizationComponent implements OnChanges, OnInit {

  @Input() nodes: Array<FbaNode> = [];
  @Input() links: Array<FbaLink> = [];
  @Input() defaultInit = true;



  @Output() subsystemClick = new EventEmitter();

  reactions: Array<FbaNode> = [];
  metabolites: Array<FbaNode> = [];
  subsystems: Array<SubsystemNode> = [];

  force: d3.layout.Force<FbaLink, FbaNode | SubsystemNode>;
  d3links: Array<FbaLink>;
  d3nodes: Array<FbaNode>;

  isFullScreen: Boolean;
  url: string;
  maxNodeX:any;
  maxNodeY:any;
  minNodeX:any;
  minNodeY:any;
  rangeX:any;
  rangeY:any;
  translate:Array<any> = [];
  scale2:number;

  a = [{"x":3,"y":2},{"x":4,"y":2},{"x":5,"y":1},{"x":10,"y":5},{"x":4,"y":9}];



  @ViewChild(FullScreenableSvgComponent) fullVisCom: FullScreenableSvgComponent;


  constructor(private location: Location) {
    this.initForce();

  }

  scaleValued(){
    this.fullVisCom.scaleValue();
  }

  initForce() {
    this.force = d3.layout.force<FbaLink, FbaNode>()
      .linkDistance(200)
      .charge(-10000)
      .size([1000, 400])
      .on('start', () => this.onForceStart())
      .on('tick', () => this.onForceTick());
  }

  onForceTick() {
    this.reactions = this.force.nodes().filter((x) => x['type'] == 'r');
    this.metabolites = this.force.nodes().filter((x) => x['type'] == 'm');
    this.subsystems = this.force.nodes().filter((x) => x['type'] == 'sub');

    this.d3links = this.force.links();
    this.d3nodes = this.force.nodes();

  }

  onForceStart() {
    this.onForceTick();
    this.deactiveteAllReaction();
  }

  ngOnInit() {
    this.url = this.location.path();
    this.deactiveteAllReaction();

  }
//
  ngOnChanges() {
    this.force.stop();
    this.force.nodes(this.nodes).links(this.links);
    this.force.start();
    //this.scaleValue();

  }

  deactiveteAllReaction() {
    if (this.defaultInit)
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

  subsystemClicked(s) {
    this.subsystemClick.emit(s);
  }


  saveAsImage() {
    this.fullVisCom.scaleValue();
    let svg = document.querySelector("svg");
    let svgData = new XMLSerializer().serializeToString(svg);
    let canvas = document.createElement("canvas");
    let svgSize = svg.getBoundingClientRect();

    canvas.width = 1000
    canvas.height = 1000;

    let ctx = canvas.getContext("2d");
    ctx.fillStyle="white";
    ctx.fillRect(0,0,10000,10000);

    let img = document.createElement("img");
    img.setAttribute("src", "data:image/svg+xml;base64," + btoa(svgData));
    ctx.drawImage(img, 0, 0);

    let imgsrc = canvas.toDataURL("image/png", 1.0);
    console.log(canvas.toDataURL("image/png"));

    let a = document.createElement("a");
    a.download = "untitled" + ".png";
    a.href = imgsrc;
    a.click();


  }

}

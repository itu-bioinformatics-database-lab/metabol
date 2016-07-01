import { Component, Input, EventEmitter, Output, OnChanges, OnInit, ElementRef} from '@angular/core';
import {FbaNode, FbaLink} from '../../services/fba/fbaiteration';
import * as d3 from 'd3';

@Component({
  moduleId: module.id,
  selector: 'visualization',
  templateUrl: 'visualization.component.html',
  styleUrls: ['visualization.component.css']
})
export class VisualizationComponent implements OnChanges, OnInit {

  @Input() nodes: Array<FbaNode>;
  @Input() links: Array<FbaLink>;

  reactions: Array<FbaNode>;
  metabolites: Array<FbaNode>;

  force: d3.layout.Force<FbaLink, FbaNode>;
  d3links: Array<FbaLink>;
  d3nodes: Array<FbaNode>;
  zoom: d3.behavior.Zoom<any>;
  scale: number;
  translate: Array<number>;

  @Input() isFullScreen: Boolean;
  @Output() isFullScreenChange: EventEmitter<Boolean>;

  constructor(private elementRef: ElementRef) {

    this.isFullScreen = this.isFullScreen || false;
    this.scale = 1;
    this.translate = [1, 1];
    this.isFullScreenChange = new EventEmitter<Boolean>();

    this.force = d3.layout.force<FbaLink, FbaNode>()
      .linkDistance(25)
      .charge(-500)
      .size([1000, 400])
      .on('tick', () => {

        this.reactions = this.force.nodes().filter(
          (x) => x['type'] == 'r');
        this.metabolites = this.force.nodes().filter(
          (x) => x['type'] == 'm');

        this.d3links = this.force.links();
        this.d3nodes = this.force.nodes();
      });
  }

  ngOnInit() {
    this.zoom = d3.behavior.zoom()
      .scaleExtent([0.1, 10])
      .on('zoom', () => this.onZoom());
    d3.select(this.elementRef.nativeElement).select('svg')
      .call(this.zoom);
  }

  onZoom() {
    this.scale = this.zoom.scale();
    this.translate = this.zoom.translate();
  }

  getSizeOfSvg(): [number, number] {
    let sizes = document.getElementsByTagName("svg")[0].getBoundingClientRect();
    return [
      sizes.width,
      sizes.height
    ];
  }

  onResize() {
    this.force.size(this.getSizeOfSvg());
    this.force.start();
  }

  ngOnChanges() {
    this.force.stop();
    this.force.nodes(this.nodes).links(this.links);
    this.force.start();
  }

  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
    this.isFullScreenChange.emit(this.isFullScreen);
  }
}

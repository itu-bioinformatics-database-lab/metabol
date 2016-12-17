import { Component, Input, Output, EventEmitter, ElementRef} from '@angular/core';
import * as d3 from 'd3';
import * as _ from 'lodash';
import {CoreVisualizationComponent} from '../core-visualization';
import {FbaNode, FbaLink, SubsystemNode} from '../../models/fbaiteration';
@Component({
  selector: 'fullscreenable-svg',
  templateUrl: 'fullscreenable-svg.component.html',
  styleUrls: ['fullscreenable-svg.component.css']
})
export class FullScreenableSvgComponent {

  @Input() isFullScreen: Boolean;
  @Input() nodes: Array<FbaNode>;

  @Output() isFullScreenChange: EventEmitter<Boolean>;

  zoom: d3.behavior.Zoom<any>;
  scale: number;
  translate: Array<number>;


  constructor(private elementRef: ElementRef) {
    this.scale = 1;
    this.translate = [0, 0];

    this.isFullScreen = this.isFullScreen || false;
    this.isFullScreenChange = new EventEmitter<Boolean>();

  }


  scaleValue(){
    this.translate = [0, 0];
    let svg = document.querySelector("svg g");
    let svgSize = svg.getBoundingClientRect();


    let container = document.querySelector("svg");
    let containerSize = container.getBoundingClientRect();
    console.log(svgSize);
    console.log(svgSize.left-33,svgSize.top-17);
    console.log(svgSize.width,containerSize.width,svgSize.height,containerSize.height);

    if((svgSize.height - containerSize.height) > (svgSize.width - containerSize.width) ){
        this.scale = this.scale*(containerSize.height/svgSize.height)


        console.log("1111");
        let svg5 = document.querySelector("svg g");
        let svgSize5 = svg5.getBoundingClientRect();
        console.log("width-after scale",svgSize5.width);
        }

    else {
        this.scale = this.scale*(containerSize.width/svgSize.width)

        console.log("222");
        }

    let svg4 = document.querySelector("svg g");
    let svgSize4 = svg4.getBoundingClientRect();


    let container4 = document.querySelector("svg");
    let containerSize4 = container4.getBoundingClientRect();
    //this.translate = [svgSize4.width/2,svgSize4.height/2]//[containerSize4.width-(svgSize4.width/2),containerSize4.height-(svgSize4.height/2) ]//[Math.abs(svgSize.width)/2,Math.abs(svgSize.height )/2];

    console.log("translate value",this.translate)
    console.log("scale value",this.scale)
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


  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
    this.isFullScreenChange.emit(this.isFullScreen);
  }

  getSizeOfSvg(): [number, number] {
    let sizes = document.getElementsByTagName("svg")[0].getBoundingClientRect();
    return [sizes.width, sizes.height];
  }

}

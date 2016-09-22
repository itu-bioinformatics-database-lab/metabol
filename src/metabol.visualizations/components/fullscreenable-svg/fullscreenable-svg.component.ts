import { Component, Input, Output, EventEmitter, ElementRef} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'fullscreenable-svg',
  templateUrl: 'fullscreenable-svg.component.html',
  styleUrls: ['fullscreenable-svg.component.css']
})
export class FullScreenableSvgComponent {

  @Input() isFullScreen: Boolean;
  @Output() isFullScreenChange: EventEmitter<Boolean>;

  zoom: d3.behavior.Zoom<any>;
  scale: number;
  translate: Array<number>;

  constructor(private elementRef: ElementRef) {
    this.scale = 1;
    this.translate = [1, 1];

    this.isFullScreen = this.isFullScreen || false;
    this.isFullScreenChange = new EventEmitter<Boolean>();
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

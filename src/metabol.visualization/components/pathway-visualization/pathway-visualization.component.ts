import { Component, ElementRef, OnChanges, Input} from '@angular/core';
import { AppDataLoader } from '../../../metabol.common/services';
import {EscherService} from '../../services';
import * as d3 from 'd3';

@Component({
  selector: 'pathway-visualization',
  templateUrl: './pathway-visualization.component.html',
  styleUrls: ['./pathway-visualization.component.css']
})
export class PathwayVisualizationComponent implements OnChanges {

  @Input() name;

  constructor(
    private loader: AppDataLoader,
    private elementRef: ElementRef,
    private escher: EscherService) { }

  ngOnChanges() {
    this.loader.get('recon2', (recon) => {
      let element = d3.select(this.elementRef.nativeElement).select('#map_container_3');
      this.escher.buildPathwayMap(this.name, recon, element);
    });
  }

}

import { Component, Input, EventEmitter, Output, OnChanges, OnInit, ElementRef, ViewChild} from '@angular/core';
import {FbaNode, FbaLink, SubsystemNode} from '../../models/fbaiteration';
import * as d3 from 'd3';
import {ActivatedRoute} from '@angular/router';
import {FullScreenableSvgComponent} from '../fullscreenable-svg';
import {LinkComponent} from '../link';
import {CoreVisualizationComponent} from '../core-visualization';


import {Location} from '@angular/common';

@Component({
  selector: 'visualization',
  templateUrl: 'visualization.component.html',
  styleUrls: ['visualization.component.css'],
})
export class VisualizationComponent {

  @Input() nodes: Array<FbaNode>;
  @Input() links: Array<FbaLink>;

  @ViewChild(CoreVisualizationComponent) coreVisCom: CoreVisualizationComponent;

  subsystemClick(s) {
    s.deactive = true;
    s.reactions.forEach(r => r.deactive = false);
    this.coreVisCom.updateMetabolitesActivation();
  }

  deactiveteAllReaction() {
    this.coreVisCom.deactiveteAllReaction();
  }

  deactiveteAllSubsystem() {
    this.coreVisCom.deactiveteAllSubsystem();
  }
  saveAsImage(){
    this.coreVisCom.saveAsImage();


  }
  /*
  saveAsImage() {
    let svg = document.querySelector("svg");
    let svgData = new XMLSerializer().serializeToString(svg);

    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    let img = document.createElement("img");
    img.setAttribute("src", "data:image/svg+xml;base64," + btoa(svgData));


    ctx.drawImage(img, 0, 0);

    // Now is done
    console.log(canvas.toDataURL("image/png"));


  }
  */

}

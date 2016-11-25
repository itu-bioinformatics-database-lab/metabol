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

}

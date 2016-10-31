import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SubsystemService} from "../../../services/subsystem/subsystem.service";
import {ChemicalEquationComponent} from "../../details/chemical-equation/chemical-equation.component";

import {RelatedToVisualizationService} from '../../../../metabol.visualizations/services';
import {FbaNode, FbaLink} from '../../../../metabol.visualizations/models';


@Component({
  selector: 'app-subsystem-detail',
  templateUrl: 'subsystem-detail.component.html',
  styleUrls: ['subsystem-detail.component.css'],
})
export class SubsystemDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private subsystem: SubsystemService,
    private relatedToVisual: RelatedToVisualizationService) {

    this.nodes = new Array<FbaNode>();
    this.links = new Array<FbaLink>();
  }

  reactions: any[];
  connectedSubsystems: string[];
  encodeURIComponent = encodeURIComponent;
  nodes: Array<FbaNode>;
  links: Array<FbaLink>;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.subsystem.detail(params['id'], (data) => {
        this.reactions = data.reactions;
        this.connectedSubsystems = data.connectedSubsystems;
        [this.nodes, this.links] = this.relatedToVisual
          .vizulizeSubsystemDetail(this.reactions);
      });
    });
  }

}

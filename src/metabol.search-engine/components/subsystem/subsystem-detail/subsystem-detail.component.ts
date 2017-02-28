import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SubsystemService} from "../../../services/subsystem/subsystem.service";
import {ChemicalEquationComponent} from "../../details/chemical-equation/chemical-equation.component";

import {RelatedToVisualizationService} from '../../../../metabol.visualizations/services';
import {FbaNode, FbaLink} from '../../../../metabol.visualizations/models';
import { AppDataLoader } from '../../../../metabol.common/services';

@Component({
  selector: 'app-subsystem-detail',
  templateUrl: 'subsystem-detail.component.html',
  styleUrls: ['subsystem-detail.component.css'],
})
export class SubsystemDetailComponent implements OnInit {

  recon: any;

  constructor(
    private route: ActivatedRoute,
    private subsystem: SubsystemService,
    private relatedToVisual: RelatedToVisualizationService,
    private loader: AppDataLoader) {

    this.nodes = new Array<FbaNode>();
    this.links = new Array<FbaLink>();
    this.recon = loader.get('recon2');
  }

  reactions: any[];
  connectedSubsystems: string[];
  encodeURIComponent = encodeURIComponent;
  nodes: Array<FbaNode>;
  links: Array<FbaLink>;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.reactions = _.values<any>(this.recon.reactions)
        .filter(x => x.subsystem == decodeURIComponent(params['id']));
    });
  }

}

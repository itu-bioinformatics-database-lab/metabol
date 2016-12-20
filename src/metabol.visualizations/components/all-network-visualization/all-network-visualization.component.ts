import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {AllNetworkVisualizationService} from '../../services';
import {SubsystemNode, FbaLink, FbaNode} from '../../models';
import * as _ from 'lodash';


@Component({
  selector: 'all-network-visualization',
  templateUrl: './all-network-visualization.component.html',
  styleUrls: ['./all-network-visualization.component.css']
})
export class AllNetworkVisualizationComponent implements OnInit {

  @Input() activeSubsystems = [];

  nodes: Array<FbaNode>;
  links: Array<FbaLink>;

  constructor(private anvService: AllNetworkVisualizationService) { }

  ngOnInit() {
    this.anvService.load();

    let data = this.anvService.get();
    this.nodes = data[0];
    this.links = data[1];

    for (let n of this.nodes)
      n.deactive = !_.includes(this.activeSubsystems, n.name);
  }

}

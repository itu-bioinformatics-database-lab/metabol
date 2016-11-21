import { Component, OnInit } from '@angular/core';
import {AllNetworkVisualizationService} from '../../services';
import {SubsystemNode, FbaLink, FbaNode} from '../../models';

@Component({
  selector: 'all-network-visualization',
  templateUrl: './all-network-visualization.component.html',
  styleUrls: ['./all-network-visualization.component.css']
})
export class AllNetworkVisualizationComponent implements OnInit {

  nodes: Array<FbaNode>;
  links: Array<FbaLink>;

  constructor(private anvService: AllNetworkVisualizationService) { }

  ngOnInit() {
    this.anvService.load();
    let data = this.anvService.get();
    this.nodes = data[0];
    this.links = data[1];
  }

}

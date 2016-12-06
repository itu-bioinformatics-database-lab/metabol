import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {AllNetworkVisualizationService} from '../../services';
import {SubsystemNode, FbaLink, FbaNode} from '../../models';

@Component({
  selector: 'all-network-visualization',
  templateUrl: './all-network-visualization.component.html',
  styleUrls: ['./all-network-visualization.component.css']
})
export class AllNetworkVisualizationComponent implements OnInit, OnChanges {

  @Input() inactiveSubsystems = [];

  nodes: Array<FbaNode>;
  links: Array<FbaLink>;

  constructor(private anvService: AllNetworkVisualizationService) { }

  ngOnInit() {
    this.anvService.load();
    let data = this.anvService.get();
    this.nodes = data[0];
    this.links = data[1];
  }

  ngOnChanges() {
    if (this.nodes)
      for (let n of this.nodes.filter(n => n.type == 'sub')) {
        n.deactive = false;
        if (_.includes(this.inactiveSubsystems, n.name))
          n.deactive = true;
      }
  }

}

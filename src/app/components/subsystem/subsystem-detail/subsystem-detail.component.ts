import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ROUTER_DIRECTIVES} from '@angular/router';
import {SubsystemService} from "../../../services/subsystem/subsystem.service";
import {ChemicalEquationComponent} from "../../details/chemical-equation/chemical-equation.component";


@Component({
  moduleId: module.id,
  selector: 'app-subsystem-detail',
  templateUrl: 'subsystem-detail.component.html',
  styleUrls: ['subsystem-detail.component.css'],
  directives: [ChemicalEquationComponent, ROUTER_DIRECTIVES]
})
export class SubsystemDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private subsystem: SubsystemService) { }

  reactions: any[];
  connectedSubsystems: string[];
  encodeURIComponent = encodeURIComponent;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.subsystem.detail(params['id'], (data) => {
        this.reactions = data.reactions;
        this.connectedSubsystems = data.connectedSubsystems;
      });
    });
  }

}

import { Component, OnInit } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {SubsystemService} from "../../services/subsystem/subsystem.service";


@Component({
  moduleId: module.id,
  selector: 'app-subsystem',
  templateUrl: 'subsystem.component.html',
  styleUrls: ['subsystem.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [SubsystemService]
})
export class SubsystemComponent implements OnInit {

  subsystems: string[];
  encodeURIComponent = encodeURIComponent;

  constructor(private subsystem: SubsystemService) { }

  ngOnInit() {
    this.subsystem.all((data) => {
      this.subsystems = data;
    });
  }

}

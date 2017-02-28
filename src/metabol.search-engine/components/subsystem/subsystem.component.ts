import { Component, OnInit } from '@angular/core';
import {SubsystemService} from "../../services/subsystem/subsystem.service";
import { AppDataLoader } from '../../../metabol.common/services';
import * as _ from 'lodash';

@Component({
  selector: 'app-subsystem',
  templateUrl: 'subsystem.component.html',
  styleUrls: ['subsystem.component.css'],
  providers: [SubsystemService]
})
export class SubsystemComponent implements OnInit {

  recon;
  subsystems: string[];
  encodeURIComponent = encodeURIComponent;

  constructor(private loader: AppDataLoader) {
    this.recon = loader.get('recon2');
  }

  ngOnInit() {
    this.subsystems = _.uniq<string>(_.values<any>(this.recon.reactions)
      .map(x => x.subsystem));
  }

}

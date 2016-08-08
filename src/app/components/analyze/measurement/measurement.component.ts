import {LoadingService} from "../../../services/loading/loading.service";
import {Router} from "@angular/router";
import {FbaService} from "../../../services/fba/fba.service";
import { Component, OnInit } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-measurement',
  templateUrl: 'measurement.component.html',
  styleUrls: ['measurement.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [FbaService]
})
export class MeasurementComponent {

  constructor(private fba: FbaService, private router: Router, private loading:LoadingService) { }

  sampleAnalyze() {
    this.loading.start();
    this.fba.startFba('', () => {
      this.router.navigate(['/analyze/result', this.fba.key]);
      this.loading.finish();
    });
  }

}

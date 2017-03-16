import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { AppDataLoader } from '../../../metabol.common/services';


@Component({
  selector: 'app-metabolite-details',
  templateUrl: 'metabolite-details.component.html',
  styleUrls: ['metabolite-details.component.css'],
})
export class MetaboliteDetailsComponent implements OnInit {

  metabolite;

  constructor(private route: ActivatedRoute, private loader: AppDataLoader) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.loader.get("recon2", (recon) => {
        this.metabolite = recon.metabolites[params['id']];
      });
    });
  }

}

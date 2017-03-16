import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { AppDataLoader } from '../../../metabol.common/services';


@Component({
  selector: 'app-reaction-details',
  templateUrl: 'reaction-details.component.html',
  styleUrls: ['reaction-details.component.css'],
})
export class ReactionDetailsComponent implements OnInit {

  reaction;

  constructor(private route: ActivatedRoute, private loader: AppDataLoader) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.loader.get("recon2", (recon) => {
        this.reaction = recon.reactions[params['id']];
      });
    });
  }

}

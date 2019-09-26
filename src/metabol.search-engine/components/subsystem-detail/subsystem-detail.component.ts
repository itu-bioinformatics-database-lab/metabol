import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppDataLoader } from '../../../metabol.common/services';
import * as _ from 'lodash';

@Component({
  selector: 'app-subsystem-detail',
  templateUrl: 'subsystem-detail.component.html',
  styleUrls: ['subsystem-detail.component.css'],
})
export class SubsystemDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loader: AppDataLoader) { }

  pathway: string;
  reactions: any[];
  connectedSubsystems: string[];

  // ngOnInit() {
  //   this.route.params.subscribe((params) => {
  //     this.loader.get('recon2', (recon) => {
  //       this.pathway = decodeURIComponent(params['id']);
  //       this.reactions = recon.pathways[this.pathway].map(x => recon.reactions[x]);
  //     });
  //   });
  // }
  ngOnInit() {

///// Changes for pathways partial names
    let params3;
    const params2 = { metabo : 'metabolism' , synth: 'synthesis', degrada: 'degradation', c : 'cycle' , bin: 'binding' , oxida : 'oxidation' , Miscellan : 'Miscellaneous' , pat: 'pathway' , catabo: 'catabolism' , detoxifica : 'detoxification' } ;
    this.route.params.subscribe((params) => {
      const last = params['id'].split(' ').pop(-1);
      // const last = lastt[lastt.length]
      // console.log(last);
      params3 = params['id'];
      if (params2[last]){
        const words = params['id'].split(' ');
        params3 = words.slice(0, (words.length - 1)).join(' ') + ' ' + params2[last];
        console.log(params3);
      }

      this.loader.get('recon2', (recon) => {
        this.pathway = decodeURIComponent(params3);
        this.reactions = recon.pathways[this.pathway].map(x => recon.reactions[x]);
      });
    });
  }
}

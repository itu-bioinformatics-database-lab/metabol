import {LoadingService} from "../../../../metabol.common/services";
import { Component, OnInit } from '@angular/core';
import { SearchBarComponent} from '../search-bar';
import {Route, ActivatedRoute} from '@angular/router';
import { AppDataLoader } from '../../../../metabol.common/services';

@Component({
  selector: 'app-search-result',
  templateUrl: 'search-result.component.html',
  styleUrls: ['search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  query: string;
  recon: any;
  filteredMetabolites: Array<any>;
  filteredReactions: Array<any>;

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingService,
    private loader: AppDataLoader) {
    this.recon = loader.get('recon2');
  }

  ngOnInit() {
    this.route.params.subscribe(params => {

      for(let k in this.recon.reactions.formula)
        console.log(this.recon.metabolites[k]);      

      this.filteredReactions = _.values<any>(this.recon.reactions)
        .filter(x =>
          x.id.startsWith(params['query'])
          || x.name.startsWith(params['query']));

      this.filteredMetabolites = _.values<any>(this.recon.metabolites)
        .filter(x =>
          x.id.startsWith(params['query'])
          || x.name.startsWith(params['query']));

    });
  }

}

import {LoadingService} from "../../../services/loading/loading.service";
import { Component, OnInit } from '@angular/core';
import { SearchBarComponent} from '../search-bar';
import {Route, ROUTER_DIRECTIVES, ActivatedRoute} from '@angular/router';
import {SearchService} from '../../../services/search/search.service';

@Component({
  moduleId: module.id,
  selector: 'app-search-result',
  templateUrl: 'search-result.component.html',
  styleUrls: ['search-result.component.css'],
  directives: [SearchBarComponent, ROUTER_DIRECTIVES],
  providers: [SearchService],
})
export class SearchResultComponent implements OnInit {
  query: string;
  filteredMetabolites: Array<any>;
  filteredReactions: Array<any>;
  nothingFound: Boolean;

  constructor(private searchService: SearchService, private route: ActivatedRoute, private loading: LoadingService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.query = params['query'];
      this.getSearchResult(this.query);
      this.generateFilters();
    });
  }

  getSearchResult(query: string) {
    if (this.query.length > 0) {
      this.loading.start();
      this.searchService.searchResult(query).subscribe(
        data => {
          this.filteredReactions = data.reactions;
          this.filteredMetabolites = data.metabolites;
        },
        error => { },
        () => {
          this.nothingFound = this.filteredReactions.length + this.filteredMetabolites.length == 0;
          this.loading.finish();
        });
    }
    else
      this.generateFilters();
  }

  generateFilters() {
    this.filteredReactions = new Array<any>();
    this.filteredMetabolites = new Array<any>();
  }

}

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
export class SearchResultComponent {
  query: string;
  filteredMetabolites: Array<any>;
  filteredReactions: Array<any>;
  n: number; //sum of list to get 'NOTHING FOUND'

  constructor(private searchService: SearchService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {

      this.query = params['query'];
      this.getSearchResult(this.query);
      this.generateFilters();

      setTimeout(() => {
        // to delay 'NOTHING FOUND'
        this.n = this.filteredReactions.length + this.filteredMetabolites.length;
      }, 600);

    });
  }

  getSearchResult(query: string) {
    if (this.query.length > 0)
      this.searchService.searchResult(query).subscribe(
        data => {
          this.filteredReactions = data["reactions"];
          this.filteredMetabolites = data["metabolites"];
        });
    else
      this.generateFilters();
  }

  generateFilters() {
    this.filteredReactions = new Array<any>();
    this.filteredMetabolites = new Array<any>();
  }

}

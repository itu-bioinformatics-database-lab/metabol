import { Component, OnInit, ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import { AppDataLoader } from '../../../../metabol.common/services';
import * as _ from 'lodash';

@Component({
  selector: 'search-bar',
  templateUrl: 'search-bar.component.html',
  styleUrls: ['search-bar.component.css'],
  host: {
    '(document:click)': 'handleClick($event)',
  },
})

export class SearchBarComponent {

  query: String;
  recon: any;
  filteredMetabolites = [];
  filteredReactions = [];

  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private loader: AppDataLoader) {
    this.recon = loader.get('recon2');
  }

  search(query: string) {
    if (query)
      this.router.navigate(['/search-result', query]);
    this.generateFilters();
  }

  getSearch(query: string) {
    if (query) {
      this.filteredReactions = _.values<any>(this.recon.reactions)
        .filter(x => x.id.startsWith(query) || x.name.startsWith(query));
      this.filteredMetabolites = _.values<any>(this.recon.metabolites)
        .filter(x => x.id.startsWith(query) || x.name.startsWith(query));
    }
  }

  generateFilters() {
    this.filteredReactions = new Array<any>();
    this.filteredMetabolites = new Array<any>();
  }

  /**
   * Closes the autocomplete when click anywhere
   * @param  {[type]} event clickEvent
   */
  handleClick(event) {
    var clickedComponent = event.target;
    var inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement)
        inside = true;
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);

    if (!inside) this.generateFilters();
  }

}

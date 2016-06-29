import { Component } from '@angular/core';
import { SearchBarComponent} from '../search-bar';

@Component({
  moduleId: module.id,
  selector: 'app-search-page',
  templateUrl: 'search-page.component.html',
  styleUrls: ['search-page.component.css'],
  directives: [SearchBarComponent]
})
export class SearchPageComponent { }

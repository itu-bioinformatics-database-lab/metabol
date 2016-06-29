import { RouterConfig } from '@angular/router';
import {SearchPageComponent} from './search-page';
import {SearchResultComponent} from './search-result';


export const SearchRoutes: RouterConfig = [
  { path: 'search', component: SearchPageComponent },
  { path: 'search-result/:query', component: SearchResultComponent },
  { path: '', redirectTo: 'search', terminal: true },
];

import { Routes } from '@angular/router';
import {SearchPageComponent} from './search-page/search-page.component';
import {SearchResultComponent} from './search-result/search-result.component';


export const SearchRoutes: Routes = [
  { path: 'search', component: SearchPageComponent },
  { path: 'search-result/:query', component: SearchResultComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' },
];

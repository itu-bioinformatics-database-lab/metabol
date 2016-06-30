import { provideRouter, RouterConfig } from '@angular/router';
import {SearchRoutes} from './components/search/search.routes';
import {DetailRoutes} from './components/details/details.routes';
import {AnalyzeRoutes} from './components/analyze/analyze.routes';

export const routes: RouterConfig = [
  ...SearchRoutes,
  ...DetailRoutes,
  ...AnalyzeRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];

import { provideRouter, RouterConfig } from '@angular/router';
import {SearchRoutes} from './components/search/search.routes';
import {DetailRoutes} from './components/details/details.routes';

export const routes: RouterConfig = [
  ...SearchRoutes,
  ...DetailRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];

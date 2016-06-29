import { provideRouter, RouterConfig } from '@angular/router';
import {SearchRoutes} from './components/search/search.routes';

export const routes: RouterConfig = [
  ...SearchRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];

import { provideRouter, RouterConfig } from '@angular/router';
import {SearchRoutes} from './components/search/search.routes';
import {DetailRoutes} from './components/details/details.routes';
import {LoginRoutes} from './components/login/login.routes';
import {SignupRoutes} from './components/signup/signup.routes';
export const routes: RouterConfig = [
  ...SearchRoutes,
  ...DetailRoutes,
  ...LoginRoutes,
  ...SignupRoutes,
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];

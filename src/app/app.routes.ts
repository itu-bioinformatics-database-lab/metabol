import { provideRouter, RouterConfig } from '@angular/router';
import {SearchRoutes} from './components/search/search.routes';
import {DetailRoutes} from './components/details/details.routes';
import {LoginRoutes} from './components/login/login.routes';
import {SignupRoutes} from './components/signup/signup.routes';
import {AnalyzeRoutes} from './components/analyze/analyze.routes';
import {PanelRoutes} from './components/panel/panel.routes';
import {DocumentationComponent} from './components/documentation/documentation.component';
import {TestComponent} from './components/test/test.component';
import {AuthGuard} from './auth-guard/auth-guard';

export const routes: RouterConfig = [
  ...SearchRoutes,
  ...DetailRoutes,
  ...LoginRoutes,
  ...SignupRoutes,
  ...AnalyzeRoutes,
  ...PanelRoutes,
  { path: 'documentation', component: DocumentationComponent },
  { path: 'test', component: TestComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  AuthGuard
];

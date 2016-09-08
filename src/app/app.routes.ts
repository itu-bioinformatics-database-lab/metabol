import { provideRouter, RouterConfig } from '@angular/router';
import {SearchEngineRoutes} from '../search-engine';
import {LoginRoutes, SignupRoutes} from '../auth';
import {SubsystemAnalyzeRoutes} from '../subsystem-analyze';
import {PanelRoutes} from './components/panel/panel.routes';
import {DocumentationComponent} from './components/documentation/documentation.component';
import {LoadingComponent} from '../common/components';

import {AuthGuard, AuthGuardLogin} from '../auth';

export const routes: RouterConfig = [
  ...SearchEngineRoutes,
  ...LoginRoutes,
  ...SignupRoutes,
  ...SubsystemAnalyzeRoutes,
  ...PanelRoutes,
  { path: 'documentation', component: DocumentationComponent },
  { path: 'loading', component: LoadingComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  AuthGuard,
  AuthGuardLogin
];

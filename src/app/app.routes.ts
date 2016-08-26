import { provideRouter, RouterConfig } from '@angular/router';
import {SearchRoutes} from './components/search/search.routes';
import {DetailRoutes} from './components/details/details.routes';
import {LoginRoutes} from './components/login/login.routes';
import {SignupRoutes} from './components/signup/signup.routes';
import {AnalyzeRoutes} from './components/analyze/analyze.routes';
import {PanelRoutes} from './components/panel/panel.routes';
import {DocumentationComponent} from './components/documentation/documentation.component';
import {TestComponent} from './components/test/test.component';
import {LoadingComponent} from './components/loading/loading.component';
import {SubsystemRoutes} from './components/subsystem/subsystem.routes';

import {AuthGuard} from './auth-guard/auth-guard';
import {AuthGuardLogin} from './auth-guard-login/auth-guard-login';

export const routes: RouterConfig = [
  ...SearchRoutes,
  ...DetailRoutes,
  ...LoginRoutes,
  ...SignupRoutes,
  ...AnalyzeRoutes,
  ...PanelRoutes,
  ...SubsystemRoutes,
  { path: 'documentation', component: DocumentationComponent },
  { path: 'test', component: TestComponent },
  { path: 'loading', component: LoadingComponent }

];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  AuthGuard,
  AuthGuardLogin
];

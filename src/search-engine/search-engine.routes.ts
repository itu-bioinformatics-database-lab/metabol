import { RouterConfig } from '@angular/router';
import {SearchRoutes, DetailRoutes, SubsystemRoutes} from './components'

export const SearchEngineRoutes: RouterConfig = [
  ...SearchRoutes,
  ...DetailRoutes,
  ...SubsystemRoutes
];

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SearchRoutes, DetailRoutes, SubsystemRoutes} from './components'

export const SearchEngineRoutes: Routes = [
  ...SearchRoutes,
  ...DetailRoutes,
  ...SubsystemRoutes
];

export const searchEngineRoutingProviders: any[] = [];

export const searchEngineRouting: ModuleWithProviders = RouterModule.forRoot(SearchEngineRoutes);

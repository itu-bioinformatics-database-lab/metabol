import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PanelRoutes} from './components'

export const MetabolPanelRoutes: Routes = [
  ...PanelRoutes,

];

export const PanelRoutesRoutingProviders: any[] = [];

export const PanelRoutesRouting: ModuleWithProviders = RouterModule.forRoot(MetabolPanelRoutes);

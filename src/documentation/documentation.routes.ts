import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DocumentationComponent} from './documentation.component';

const documentationRoutes: Routes = [
    { path: 'documentation', component: DocumentationComponent },
    { path: '', redirectTo: '/documentation', pathMatch: 'full' },
];

export const documentationRoutingProviders: any[] = [];

export const documentationRouting: ModuleWithProviders = RouterModule.forRoot(documentationRoutes);

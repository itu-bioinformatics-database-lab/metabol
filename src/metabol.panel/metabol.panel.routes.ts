import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../metabol.auth";
import {
  PanelComponent,
  ProfileComponent,
  PastAnalysisComponent,
  ChangePasswordComponent,
  PastAnalysisDetailComponent,
  CompareAnalysisComponent
} from "./components";


export const MetabolPanelRoutes: Routes = [{
  path: 'panel',
  component: PanelComponent,
  canActivate: [AuthGuard],
  children: [
    { path: '', redirectTo: 'profile', pathMatch: 'full' },
    { path: 'profile', component: ProfileComponent },
    { path: 'past-analysis', component: PastAnalysisComponent },
    { path: 'changePassword', component: ChangePasswordComponent },
    { path: 'past-analysis/:key', component: PastAnalysisDetailComponent },
    { path: 'compare-analysis', component: CompareAnalysisComponent }
  ]
},
{ path: 'past-analysis', component: PastAnalysisComponent },
{ path: 'search-past-analysis/:query', component: PastAnalysisComponent },
{ path: 'past-analysis/:key', component: PastAnalysisDetailComponent },
{ path: 'compare-analysis', component: CompareAnalysisComponent }
];


export const PanelRoutesRoutingProviders: any[] = [];

export const PanelRoutesRouting: ModuleWithProviders = RouterModule.forRoot(MetabolPanelRoutes);

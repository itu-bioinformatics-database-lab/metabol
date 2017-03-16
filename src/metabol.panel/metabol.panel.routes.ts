import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "../metabol.auth";
import {
  PanelComponent,
  ProfileComponent,
  PastAnalysisComponent,
  ChangePasswordComponent,
  PastAnalysisDetailComponent
} from "./components";


export const MetabolPanelRoutes: Routes = [{
  path: 'panel',
  component: PanelComponent,
  canActivate: [AuthGuard],
  children: [
    { path: '', redirectTo: 'profile' },
    { path: 'profile', component: ProfileComponent },
    { path: 'past-analysis', component: PastAnalysisComponent },
    { path: 'changePassword', component: ChangePasswordComponent },
    { path: 'past-subsystem/:key', component: PastAnalysisDetailComponent }
  ]
}];


export const PanelRoutesRoutingProviders: any[] = [];

export const PanelRoutesRouting: ModuleWithProviders = RouterModule.forRoot(MetabolPanelRoutes);

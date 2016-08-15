import {DetailComponent} from "./analyze/detail/detail.component";
import {Component} from '@angular/core';
import {RouterConfig} from '@angular/router';
import {PanelComponent} from './panel.component';
import {AnalyzeComponent} from './analyze/analyze.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from '../../auth-guard/auth-guard';
import {ChangePasswordComponent} from './profile/change-password/change-password.component';

export const PanelRoutes: RouterConfig = [{
  path: 'panel',
  component: PanelComponent,
  canActivate: [AuthGuard],
  children: [
    { path: '', component: ProfileComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'analyze', component: AnalyzeComponent },
    {path:'changePassword', component: ChangePasswordComponent},
    { path: 'analyze-detail/:key', component: DetailComponent },
  ]
}];

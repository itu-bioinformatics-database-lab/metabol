import {Component} from '@angular/core';
import {RouterConfig} from '@angular/router';
import {PanelComponent} from './panel.component';
import {AnalyzeComponent} from './analyze/analyze.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from '../../auth-guard/auth-guard';

export const PanelRoutes: RouterConfig = [{
  path: 'panel',
  component: PanelComponent,
  canActivate: [AuthGuard],
  children: [
    { path: '', component: ProfileComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'analyze', component: AnalyzeComponent },
  ]
}];

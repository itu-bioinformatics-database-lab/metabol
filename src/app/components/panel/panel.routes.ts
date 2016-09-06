import {Component} from '@angular/core';
import {RouterConfig} from '@angular/router';
import {PanelComponent} from './panel.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from '../../../auth';
import {ChangePasswordComponent} from './profile/change-password/change-password.component';

export const PanelRoutes: RouterConfig = [{
  path: 'panel',
  component: PanelComponent,
  canActivate: [AuthGuard],
  children: [
    { path: '', redirectTo: 'analyze', terminal: true },
    { path: 'profile', component: ProfileComponent },
    {path:'changePassword', component: ChangePasswordComponent},
  ]
}];

import {Component} from '@angular/core';
import {Routes} from '@angular/router';
//import {RouterConfig} from '@angular/router';
import {PanelComponent} from './panel.component';
import {ProfileComponent} from './profile';
import {PastAnalysisComponent} from './past-analysis';
import {CompareAnalysisComponent} from "./compare-analysis";
import {AuthGuard} from '../../../metabol.auth/auth-guard/auth-guard';
import {ChangePasswordComponent} from './profile/change-password/change-password.component';

export const PanelRoutes: Routes = [{
  path: 'panel',
  component: PanelComponent,
  canActivate: [AuthGuard],
  children: [
    //{ path: '', redirectTo: 'analyze', terminal: true },
    { path: '', redirectTo: 'profile' }, //, terminal: true }, //Bu geçici. Yukarıdakiyle değiştireceğim
    { path: 'profile', component: ProfileComponent },
    { path: 'past-analysis', component: PastAnalysisComponent },
    { path: 'compare-analysis', component:  CompareAnalysisComponent},
    { path: 'changePassword', component: ChangePasswordComponent },
  ]
}];

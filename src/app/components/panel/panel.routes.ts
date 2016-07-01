import {Component} from '@angular/core';
import {RouterConfig} from '@angular/router';
import {PanelComponent} from './panel.component';
import {AnalyzeComponent} from './analyze/analyze.component';
import {ProfileComponent} from './profile/profile.component';


/*export const PanelRoutes: RouterConfig = [
  {path: 'panel',  component: PanelComponent}


];*/


export const PanelRoutes: RouterConfig = [{
  path: 'panel',
  component: PanelComponent,
  children: [
    { path: '', component: ProfileComponent },  
    { path: 'profile', component: ProfileComponent },
    { path: 'analyze', component:AnalyzeComponent },

  ]
}];

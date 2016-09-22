import {Component} from '@angular/core';
import {Routes} from '@angular/router';
import {MetaboliteDetailsComponent} from './metabolite-details/metabolite-details.component';
import {ReactionDetailsComponent} from './reaction-details/reaction-details.component';


export const DetailRoutes: Routes = [
  { path: 'metabolite/:metaboliteId',  component: MetaboliteDetailsComponent },
  { path: 'reaction/:reactionId', component: ReactionDetailsComponent }
];

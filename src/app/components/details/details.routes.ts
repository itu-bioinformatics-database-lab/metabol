import {Component} from '@angular/core';
import {RouterConfig, ROUTER_DIRECTIVES} from '@angular/router';
import {MetaboliteDetailsComponent} from './metabolite-details/metabolite-details.component';
import {ReactionDetailsComponent} from './reaction-details/reaction-details.component';


export const DetailRoutes: RouterConfig = [
  { path: 'metabolite/:metaboliteId',  component: MetaboliteDetailsComponent },
  { path: 'reaction/:reactionId', component: ReactionDetailsComponent }
];

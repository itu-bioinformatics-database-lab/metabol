import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {MetaboliteDetailsComponent} from './metabolite-details/metabolite-details.component';
import {ReactionDetailsComponent} from './reaction-details/reaction-details.component';

 @Component ({
   selector: 'detail',
   template: `<router-outlet></router-outlet>`,
   directives: [ROUTER_DIRECTIVES]

 })
 @RouteConfig([
     { path: '/metabolite/:metaboliteId', name: 'MetaboliteDetails', component: MetaboliteDetailsComponent},
     { path: '/reaction/:reactionId', name: 'ReactionDetails', component: ReactionDetailsComponent }
 ])
export class DetailsComponent {}

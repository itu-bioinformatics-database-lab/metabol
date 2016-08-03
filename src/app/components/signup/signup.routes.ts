import {Component} from '@angular/core';
import {RouterConfig, ROUTER_DIRECTIVES} from '@angular/router';
import {SignupComponent} from '../signup/signup.component';
import {PanelComponent} from '../panel/panel.component';


export const SignupRoutes: RouterConfig = [
    
{ path: 'signup', component: SignupComponent }

];

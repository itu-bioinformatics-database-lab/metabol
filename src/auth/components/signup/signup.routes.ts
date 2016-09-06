import {Component} from '@angular/core';
import {RouterConfig, ROUTER_DIRECTIVES} from '@angular/router';
import {SignupComponent} from '../signup/signup.component';

export const SignupRoutes: RouterConfig = [
  { path: 'signup', component: SignupComponent }
];

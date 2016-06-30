import {Component} from '@angular/core';
import {RouterConfig, ROUTER_DIRECTIVES} from '@angular/router';
import {LoginComponent} from './login.component';
import {SignupComponent} from '../signup/signup.component';


/*export const LoginRoutes: RouterConfig = [{
  path: 'login',
  component: LoginComponent,
  children: [
    { path: 'signup', component: SignupComponent },

      ]
}];
*/
export const LoginRoutes: RouterConfig = [

{ path: 'login', component: LoginComponent },

];

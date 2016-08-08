import {Component} from '@angular/core';
import {RouterConfig, ROUTER_DIRECTIVES} from '@angular/router';
import {LoginComponent} from './login.component';
import {SignupComponent} from '../signup/signup.component';
import {AuthGuardLogin} from '../../auth-guard-login/auth-guard-login';



export const LoginRoutes: RouterConfig = [

{ path: 'login', component: LoginComponent, canActivate:[AuthGuardLogin] },

];

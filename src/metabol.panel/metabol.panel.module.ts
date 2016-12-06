import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {PanelComponent} from './components'
import {LoginService} from '../metabol.auth/services/login/login.service';
import {PanelRoutesRoutingProviders, PanelRoutesRouting} from './metabol.panel.routes';
import {ChangePasswordComponent} from './components/panel/profile/change-password/change-password.component';
import {ProfileComponent} from './components/panel/profile/profile.component'


@NgModule({
    declarations: [
        PanelComponent,
        ProfileComponent,
        ChangePasswordComponent,


    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpModule,

        PanelRoutesRouting,
    ],
    providers: [
        LoginService,
        PanelRoutesRoutingProviders,



    ],
    exports: [

    ]
})
export class MetabolPanelModule { }

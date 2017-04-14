import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {SimpleNotificationsModule} from 'angular2-notifications'

import { routing, appRoutingProviders }  from './app.routes';
import { AppComponent } from './app.component';

import {DocumentationModule} from '../documentation';
import {MetabolCommonModule} from '../metabol.common';
import {SearchEngineModule} from "../metabol.search-engine";
import {VisualizationModule} from "../metabol.visualization";
import {MetabolAuthModule} from "../metabol.auth";
import {SubsystemAnalyzeModule} from "../metabol.subsystem-analyze";
import {MetabolPanelModule} from '../metabol.panel';

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    MetabolCommonModule,
    DocumentationModule,
    MetabolAuthModule,
    SearchEngineModule,
    SubsystemAnalyzeModule,
    MetabolPanelModule,
    VisualizationModule,

    SimpleNotificationsModule.forRoot(),
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

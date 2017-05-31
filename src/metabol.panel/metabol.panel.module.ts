import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SubsystemAnalyzeModule } from "../metabol.subsystem-analyze";
import { VisualizationModule } from '../metabol.visualization';
import { NgPipesModule } from 'ngx-pipes';

import { MdDialogModule } from '@angular/material'
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import {
  PanelComponent,
  ProfileComponent,
  PastAnalysisComponent,
  ChangePasswordComponent,
  PastAnalysisDetailComponent,
  CompareAnalysisComponent,
  DialogPathwayVisualizationComponent,
  DialogReactionResultsComponent,
  ResultTableComponent
} from "./components";

import { LoginService } from '../metabol.auth/services/login/login.service';
import { PanelRoutesRoutingProviders, PanelRoutesRouting } from './metabol.panel.routes';

@NgModule({
  declarations: [
    PanelComponent,
    ProfileComponent,
    ChangePasswordComponent,
    PastAnalysisComponent,
    PastAnalysisDetailComponent,
    CompareAnalysisComponent,
    DialogPathwayVisualizationComponent,
    DialogReactionResultsComponent,
    ResultTableComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,

    NgPipesModule,
    NgxPaginationModule,
    NgxDatatableModule,

    PanelRoutesRouting,
    SubsystemAnalyzeModule,
    VisualizationModule,
    MdDialogModule
  ],
  providers: [
    LoginService,
    PanelRoutesRoutingProviders,
  ],
  exports: [],
  entryComponents: [
    DialogPathwayVisualizationComponent,
    DialogReactionResultsComponent,
  ]
})
export class MetabolPanelModule { }

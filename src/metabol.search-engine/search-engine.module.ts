import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgPipesModule } from 'ngx-pipes';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';

import {
  ChemicalEquationComponent,
  ReactionDetailsComponent,
  MetaboliteDetailsComponent,
  SearchBarComponent,
  SearchPageComponent,
  SearchResultComponent,
  SubsystemComponent,
  SubsystemDetailComponent,
  AnalysisSearchComponent
} from './components';

import { VisualizationModule } from "../metabol.visualization";
import { searchEngineRouting } from './search-engine.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MaterialModule,
    FlexLayoutModule,
    NgPipesModule,

    searchEngineRouting,
    VisualizationModule,
  ],
  // providers: [searchEngineRoutingProviders],
  declarations: [
    ChemicalEquationComponent,
    ReactionDetailsComponent,
    MetaboliteDetailsComponent,
    SearchBarComponent,
    SearchPageComponent,
    SearchResultComponent,
    SubsystemComponent,
    SubsystemDetailComponent,
    AnalysisSearchComponent
  ]
})
export class SearchEngineModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  ChemicalEquationComponent,
  ReactionDetailsComponent,
  MetaboliteDetailsComponent,
  SearchBarComponent,
  SearchPageComponent,
  SearchResultComponent,
  SubsystemComponent,
  SubsystemDetailComponent
} from './components';

import {MetabolVisualizationModule} from '../metabol.visualizations'

import {searchEngineRoutingProviders, searchEngineRouting} from './search-engine.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MetabolVisualizationModule,
    searchEngineRouting
  ],
  providers: [searchEngineRoutingProviders],
  declarations: [
    ChemicalEquationComponent,
    ReactionDetailsComponent,
    MetaboliteDetailsComponent,
    SearchBarComponent,
    SearchPageComponent,
    SearchResultComponent,
    SubsystemComponent,
    SubsystemDetailComponent
  ]
})
export class SearchEngineModule { }

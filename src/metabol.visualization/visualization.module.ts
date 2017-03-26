import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ReactionVisualizationComponent,
  MetaboliteVisualizationComponent
} from './components';

import {EscherService} from './services'

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ReactionVisualizationComponent,
    MetaboliteVisualizationComponent
  ],
  providers: [
    EscherService
  ],
  exports: [
    ReactionVisualizationComponent,
    MetaboliteVisualizationComponent
  ]
})
export class VisualizationModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ReactionVisualizationComponent,
  MetaboliteVisualizationComponent,
  PathwayVisualizationComponent
} from './components';

import {EscherService} from './services'

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ReactionVisualizationComponent,
    MetaboliteVisualizationComponent,
    PathwayVisualizationComponent
  ],
  providers: [
    EscherService
  ],
  exports: [
    ReactionVisualizationComponent,
    MetaboliteVisualizationComponent,
    PathwayVisualizationComponent
  ]
})
export class VisualizationModule { }

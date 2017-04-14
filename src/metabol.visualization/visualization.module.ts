import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ReactionVisualizationComponent,
  MetaboliteVisualizationComponent,
  PathwayVisualizationComponent,
  PathwayHeatmapComponent
} from './components';

import {EscherService} from './services'

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ReactionVisualizationComponent,
    MetaboliteVisualizationComponent,
    PathwayVisualizationComponent,
    PathwayHeatmapComponent
  ],
  providers: [
    EscherService
  ],
  exports: [
    ReactionVisualizationComponent,
    MetaboliteVisualizationComponent,
    PathwayVisualizationComponent,
    PathwayHeatmapComponent
  ]
})
export class VisualizationModule { }

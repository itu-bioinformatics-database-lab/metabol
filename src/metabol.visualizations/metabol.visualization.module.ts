import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  VisualizationComponent,
  FullScreenableSvgComponent
} from './components';

import {
  RelatedToVisualizationService,
  ServiceService
} from './services';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    RelatedToVisualizationService,
    ServiceService
  ],
  declarations: [
    VisualizationComponent,
    FullScreenableSvgComponent
  ],
  exports:[
    VisualizationComponent,
    FullScreenableSvgComponent
  ]
})
export class MetabolVisualizationModule { }

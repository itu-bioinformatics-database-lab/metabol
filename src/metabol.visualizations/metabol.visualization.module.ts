import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MetabolCommonModule} from '../metabol.common';

import {
  VisualizationComponent,
  FullScreenableSvgComponent,
  SubsystemComponent
} from './components';

import {
  RelatedToVisualizationService,
  ServiceService
} from './services';

@NgModule({
  imports: [
    CommonModule,
    MetabolCommonModule
  ],
  providers: [
    RelatedToVisualizationService,
    ServiceService
  ],
  declarations: [
    VisualizationComponent,
    FullScreenableSvgComponent,
    SubsystemComponent
  ],
  exports:[
    VisualizationComponent,
    FullScreenableSvgComponent
  ]
})
export class MetabolVisualizationModule { }

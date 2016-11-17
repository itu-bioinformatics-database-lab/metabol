import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MetabolCommonModule} from '../metabol.common';

import {
  VisualizationComponent,
  FullScreenableSvgComponent,
  SubsystemComponent,
  MetaboliteComponent,
  ReactionComponent,
  LinkComponent,
  NodeTextComponent,
} from './components';

import {
  RelatedToVisualizationService,
  ServiceService,
  AllNetworkVisualizationService
} from './services';

@NgModule({
  imports: [
    CommonModule,
    MetabolCommonModule
  ],
  providers: [
    RelatedToVisualizationService,
    ServiceService,
    AllNetworkVisualizationService
  ],
  declarations: [
    VisualizationComponent,
    FullScreenableSvgComponent,
    MetaboliteComponent,
    ReactionComponent,
    SubsystemComponent,
    LinkComponent,
    NodeTextComponent,
  ],
  exports: [
    VisualizationComponent,
    FullScreenableSvgComponent
  ]
})
export class MetabolVisualizationModule { }

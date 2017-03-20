import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  ReactionVisualizationComponent,
  MetaboliteVisualizationComponent
} from './components';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,

  ],

  declarations: [
    ReactionVisualizationComponent,
    MetaboliteVisualizationComponent
  ],

  exports:[
    ReactionVisualizationComponent,
    MetaboliteVisualizationComponent
  ]
})
export class VisualizationModule { }

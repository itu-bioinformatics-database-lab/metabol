import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import {
  AnalyzeComponent,
  ConcentrationTableComponent,
  ManualComponent,
  MeasurementComponent,
  UploadComponent,
  SampleComponent,
  SubsystemAnalyzeComponent,
  TreeVisualizationComponent,
  SolutionTableComponent
} from './components';

import {subsystemAnalyzeRoutingProviders, subsystemAnalyzeRouting} from './subsystem-analyze.routes';

import {MetabolVisualizationModule} from '../metabol.visualizations';
import {MetabolCommonModule} from '../metabol.common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    subsystemAnalyzeRouting,
    MetabolCommonModule,
    MetabolVisualizationModule
  ],
  providers: [subsystemAnalyzeRoutingProviders],
  declarations: [
    SolutionTableComponent,
    TreeVisualizationComponent,
    AnalyzeComponent,
    ConcentrationTableComponent,
    ManualComponent,
    MeasurementComponent,
    UploadComponent,
    SampleComponent,
    SubsystemAnalyzeComponent
  ],
})
export class SubsystemAnalyzeModule { }

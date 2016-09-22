import {SampleComponent} from "./sample/sample.component";
import { Routes } from '@angular/router';
import {ConcentrationTableComponent} from './concentration-table';
import {ManualComponent} from './manual/manual.component';
import {UploadComponent} from './upload/upload.component';
import {SubsystemAnalyzeComponent} from './subsystem-analyze.component';
import {AnalyzeComponent} from "./analyze";
import {MeasurementComponent} from './measurement/measurement.component';

export const SubsystemAnalyzeRoutes: Routes = [{
  path: 'analyze',
  component: SubsystemAnalyzeComponent,
  children: [
    { path: 'manual', component: ManualComponent },
    { path: 'upload', component: UploadComponent },
    { path: 'measurement', component: MeasurementComponent },
    { path: 'subsystem/:key', component: AnalyzeComponent },
    { path: 'sample', component: SampleComponent },
    { path: '', redirectTo: 'measurement', pathMatch: 'full' }
  ]
}];

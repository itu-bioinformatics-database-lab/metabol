import {SampleComponent} from "./sample/sample.component";
import { RouterConfig } from '@angular/router';
import {ConcentrationTableComponent} from './concentration-table';
import {ManualComponent} from './manual/manual.component';
import {UploadComponent} from './upload/upload.component';
import {SubsystemAnalyzeComponent} from './subsystem-analyze.component';
import {MeasurementComponent} from './measurement/measurement.component';

export const SubsystemAnalyzeRoutes: RouterConfig = [{
  path: 'analyze',
  component: SubsystemAnalyzeComponent,
  children: [
    { path: 'manual', component: ManualComponent },
    { path: 'upload', component: UploadComponent },
    { path: 'measurement', component: MeasurementComponent },
    // { path: 'result/:key', component: ResultComponent },
    { path: 'sample', component: SampleComponent },
    { path: '', redirectTo: 'measurement', terminal: true }
  ]
}];

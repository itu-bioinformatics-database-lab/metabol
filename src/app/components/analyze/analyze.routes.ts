import {SampleComponent} from "./sample/sample.component";
import { RouterConfig } from '@angular/router';
import {ConcentrationTableComponent} from './concentration-table';
import {ManualComponent} from './manual/manual.component';
import {UploadComponent} from './upload/upload.component';
import {AnalyzeComponent} from './analyze.component';
import {MeasurementComponent} from './measurement/measurement.component';
import {ResultComponent} from './result/result.component';


export const AnalyzeRoutes: RouterConfig = [{
  path: 'analyze',
  component: AnalyzeComponent,
  children: [
    { path: 'manual', component: ManualComponent },
    { path: 'upload', component: UploadComponent },
    { path: 'measurement', component: MeasurementComponent },
    { path: 'result/:key', component: ResultComponent },
    { path: 'sample', component: SampleComponent },
    { path: '', redirectTo: 'measurement', terminal: true }
  ]
}];

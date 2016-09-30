import { Routes } from '@angular/router';
import {SubsystemComponent} from './subsystem.component';
import {SubsystemDetailComponent} from './subsystem-detail/subsystem-detail.component';


export const SubsystemRoutes: Routes = [
  {
    path: 'subsystem',
    component: SubsystemComponent,
    children: [
      { path: 'detail/:id', component: SubsystemDetailComponent }
    ]
  },
  {
    path: 'subsystem',
    component: SubsystemComponent
  }
];

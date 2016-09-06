import { Component } from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {LoginService} from '../../../auth/services';

@Component({
  moduleId: module.id,
  selector: 'app-panel',
  templateUrl: 'panel.component.html',
  styleUrls: ['./css/font-awesome.min.css',
    './css/sb-admin-2.css',
    './css/style.css',
  ],
  directives: [ROUTER_DIRECTIVES],
  providers: [LoginService],
})


export class PanelComponent { }

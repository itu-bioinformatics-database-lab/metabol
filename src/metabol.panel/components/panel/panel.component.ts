import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../../metabol.auth/services/login/login.service';

@Component({
  selector: 'app-panel',
  templateUrl: 'panel.component.html',
  styleUrls: [
    './css/font-awesome.min.css',
    './css/sb-admin-2.css',
    './panel.component.css'
  ],
  providers: [LoginService],
})


export class PanelComponent { }

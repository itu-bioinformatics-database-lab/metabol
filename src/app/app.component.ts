import { Component, OnInit } from '@angular/core';
import {LoadingService} from '../metabol.common/services';
import {AppSettings} from './app.settings';
import {AppDataLoader} from '../metabol.common/services'
import {LoginService} from '../metabol.auth/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  notificationOptions = AppSettings.NOTIFICATION_OPTIONS;

  constructor(
    public loadingService: LoadingService,
    public loginService: LoginService) {
  }

  ngOnInit() {
  }

}

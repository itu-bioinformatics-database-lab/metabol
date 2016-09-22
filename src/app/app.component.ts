import { Component } from '@angular/core';
import {LoadingService} from '../metabol.common/services';
import {AppSettings} from './app.settings';
import {AppDataLoader} from '../metabol.common/services'
import {LoginService} from '../metabol.auth/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  notificationOptions = AppSettings.NOTIFICATION_OPTIONS;

  constructor(appDataLoader: AppDataLoader,
    public loadingService: LoadingService,
    public loginService: LoginService) {
      appDataLoader.load();
   }

}

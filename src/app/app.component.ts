import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {AppDataLoader} from './appDataLoader';
import {LoadingComponent} from './components/loading/loading.component';
import {LoadingService} from './services/loading/loading.service';
import {LoginService} from './services/login/login.service'
import {NotificationsService, SimpleNotificationsComponent} from 'angular2-notifications'
import {notificationOptions} from './notificationOptions';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES, LoadingComponent, SimpleNotificationsComponent],
  providers: [AppDataLoader, LoginService]
})
export class AppComponent {

  loading: boolean = false;
  notificationOptions = notificationOptions;

  constructor(appDataLoader: AppDataLoader,
    public loadingService: LoadingService,
    public loginService: LoginService) {
    appDataLoader.load();
  }

}

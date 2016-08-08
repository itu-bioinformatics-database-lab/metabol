import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {AppDataLoader} from './appDataLoader';
import {LoadingComponent} from './components/loading/loading.component';
import {LoadingService} from './services/loading/loading.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES, LoadingComponent],
  providers: [AppDataLoader]
})
export class AppComponent {

  constructor(appDataLoader: AppDataLoader, public loading: LoadingService) {
    appDataLoader.load();
  }
}

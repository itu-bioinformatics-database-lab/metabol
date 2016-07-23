import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {AppDataLoader} from './appDataLoader';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [AppDataLoader]
})
export class AppComponent {

  constructor(appDataLoader: AppDataLoader) {
    appDataLoader.load();
  }
}

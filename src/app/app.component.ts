import { Component } from '@angular/core';
import {LoadingService} from '../metabol.common/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private loadingService: LoadingService) { }

}

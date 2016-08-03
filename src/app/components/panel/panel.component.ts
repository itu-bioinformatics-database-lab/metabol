import { Component } from '@angular/core';
import {Router, CanActivate,ROUTER_DIRECTIVES} from '@angular/router';
import {LoginService} from '../../services/login/login.service';

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


//@CanActivate(() => isLoggedIn())
export class PanelComponent implements CanActivate{

  constructor(public auth: LoginService) { }

  canActivate() {
    console.log('AuthGuard#canActivate called');
    return true;
  }

  ngOnInit(){
        this.auth.checkCredentials();
    }


}

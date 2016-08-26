import { Component, OnInit } from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import { Http, Response, Headers} from '@angular/http';
import {LoginService} from '../../services/login/login.service';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES],
  providers: [LoginService],

})
export class LoginComponent {

  form: ControlGroup;
  token: string;
  error: boolean = false;
  constructor(fb: FormBuilder, public http: Http, public auth: LoginService, private router: Router) {
    this.form = fb.group({
      "Email": ["", Validators.required],
      "Password": ["", Validators.required]
    });
  }

  onSubmit(value) {
    this.auth.login(value, () => this.router.navigate(['/panel']));
  }

}

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import { Http, Response, Headers} from '@angular/http';
import {LoginService} from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers: [LoginService],

})
export class LoginComponent {

  form: FormGroup;
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

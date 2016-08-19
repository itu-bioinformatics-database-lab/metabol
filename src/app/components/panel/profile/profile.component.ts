import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router} from '@angular/router';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators} from '@angular/common';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {LoginService} from '../../../services/login/login.service';
@Component({
  moduleId: module.id,
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css'],
  directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, ChangePasswordComponent],
  providers: [LoginService]
})
export class ProfileComponent {
  name: string;
  surname: string;
  email: string;
  affiliation: string;
  form: ControlGroup;

  constructor(fb: FormBuilder, public loginService: LoginService, private router: Router) {

    this.formValues();
    this.form = fb.group({
      "name": [this.name, Validators.required],
      "surname": [this.surname, Validators.required],
      "email": [this.email, Validators.required],
      "affiliation": [this.affiliation, Validators.required],
    });
  }

  formValues():void {
    this.loginService.userInfo((data) => {
      this.name = data.name;  // data.name;
      this.surname = data.surname;
      this.email = data.email;
      this.affiliation = data.affiliation
      console.log(this.name);

  });
  this.name = "aaa";
  }

  onSubmit(value) {
    this.loginService.submitUserInfo(value, () => this.router.navigate(['/panel/profile']));
  }

}

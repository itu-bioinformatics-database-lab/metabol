import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router} from '@angular/router';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators} from '@angular/common';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {LoginService} from '../../../../auth/services';


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

  //TODO: reduce code repetation
  constructor(private fb: FormBuilder, public loginService: LoginService, private router: Router) {
    this.form = fb.group({
      "name": [this.name, Validators.required],
      "surname": [this.surname, Validators.required],
      "email": [this.email, Validators.required],
      "affiliation": [this.affiliation, Validators.required],
    });
    this.formValues();
  }

  formValues(): void {
    this.loginService.userInfo((data) => {
      this.form = this.fb.group({
        "name": [data.name, Validators.required],
        "surname": [data.surname, Validators.required],
        "email": [data.email, Validators.required],
        "affiliation": [data.affiliation, Validators.required],
      });
    });
  }

  onSubmit(value) {
    this.loginService.submitUserInfo(value, () => this.router.navigate(['/panel/profile']));
  }

}

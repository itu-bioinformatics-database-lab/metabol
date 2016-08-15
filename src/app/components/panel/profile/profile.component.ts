import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES} from '@angular/router';
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
  Name: string;
  Surname:string;
  Email:string;
  Affiliation:string;
  form: ControlGroup;
  constructor(fb: FormBuilder, public loginService: LoginService) {
    this.formValues();
    this.form = fb.group({
      "Name": [this.Name, Validators.required],
      "Surname": [this.Surname, Validators.required],
      "Email": [this.Email, Validators.required],
      "Affiliation": [this.Affiliation, Validators.required],
    });
  }

  formValues() {
    this.loginService.userInfo((data) => {
      this.Name = data; //Burda bir problem var user info datasını alamıyorum
    });

    this.Name = "ALi";

  }

  onSubmit(value: string) {
    console.log(value);
  }

}

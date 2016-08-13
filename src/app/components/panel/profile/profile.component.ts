import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES} from '@angular/router';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators} from '@angular/common';
import {ChangePasswordComponent} from './change-password/change-password.component';

@Component({
  moduleId: module.id,
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css'],
  directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES,ChangePasswordComponent]

})
export class ProfileComponent {

  form: ControlGroup;
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      "Name": ["", Validators.required],
      "Surname": ["", Validators.required],
      "Email": ["", Validators.required],
      "Institution": ["", Validators.required],
    });
  }


  onSubmit(value: string) {
    console.log(value);
  }

}

import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES} from '@angular/router';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators} from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css'],
  directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES]

})
export class ProfileComponent {

  form: ControlGroup;
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      "Name": ["", Validators.required],
      "Surname": ["", Validators.required],
      "Email": ["", Validators.required],
      "Institution": ["", Validators.required],
      "ConfirmPassword": ["", Validators.required],
      "Password": ["", Validators.compose([Validators.required, Validators.minLength(6)])],

    },
      { validator: this.matchingPasswords('Password', 'ConfirmPassword') });
  }

  //To chech whether confirmPasswor is same with Password or not
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: ControlGroup): { [key: string]: any } => {
      let Password = group.controls[passwordKey];
      let ConfirmPassword = group.controls[confirmPasswordKey];
      if (!ConfirmPassword)
        return { mismatchedPasswords: false };
      else if (Password.value !== ConfirmPassword.value)
        return { mismatchedPasswords: true };
    }
  }

  onSubmit(value: string) {
    console.log(value);
  }

}

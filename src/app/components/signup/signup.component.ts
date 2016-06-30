import { Component, OnInit } from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators} from '@angular/common';
import {SignupService} from '../../services/signup/signup.service';
import { Http, Response, Headers} from '@angular/http';

@Component({
  moduleId: module.id,
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css'],
  directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES],
  providers: [SignupService],
})
export class SignupComponent {

  form: ControlGroup;

  constructor(private _signupService: SignupService, private fb: FormBuilder,
    private http: Http, private router: Router) {

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

  onSubmit(value) {
    console.log(value);
    this._signupService.onSubmit(value)
      .subscribe(
      response => {
        this.router.navigate(['Panel'])
      },
      error => {
        alert(error.text());
        console.log(error.text());
      });

  }



}

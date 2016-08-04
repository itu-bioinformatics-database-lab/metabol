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
      "name": ["", Validators.required],
      "surname": ["", Validators.required],
      "email": ["", Validators.required],
      "affiliation": ["", Validators.required],
      "confirmPassword": ["", Validators.required],
      "password": ["", Validators.compose([Validators.required, Validators.minLength(6)])],
    },
      { validator: this.matchingPasswords('password', 'confirmPassword') });
  }

  /**
   * To chech whether confirmPasswor is same with Password or not
   * @param  {string} passwordKey        [description]
   * @param  {string} confirmPasswordKey [description]
   * @return {[type]}                    [description]
   */
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: ControlGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
      if (!confirmPassword)
        return { mismatchedPasswords: false };
      else if (password.value !== confirmPassword.value)
        return { mismatchedPasswords: true };
    }
  }

  onSubmit(value) {
    console.log(value);
    this._signupService.onSubmit(value)
      .subscribe(
      response => {
        this.router.navigate(['/panel'])
      },
      error => {
        alert(error.text());
        console.log(error.text());
      });

  }



}

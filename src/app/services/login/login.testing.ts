import {RequestOptions, Headers} from "@angular/http";
import { Injectable } from '@angular/core';

@Injectable()
export class LoginTestingService {

  constructor() {

  }

  login(loginForm, callback: (data) => void) {
    throw new SyntaxError("Not implemented");
  }

  logout() {
    throw new SyntaxError("Not implemented");
  }

  changePassword(signupForm, callback: () => void) {
    throw new SyntaxError("Not implemented");
  }

  userInfo(callback: (data) => void) {
    throw new SyntaxError("Not implemented");
  }

  submitUserInfo(value, callback: (data) => void) {
    throw new SyntaxError("Not implemented");
  }

  isLoggedIn() {
    throw new SyntaxError("Not implemented");
  }

  token() {
    throw new SyntaxError("Not implemented");
  }

  optionByAuthorization() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new RequestOptions({ headers: headers });
  }
}

import { Component } from '@angular/core';

import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AuthenticationRequest} from "../../services/models/authentication-request";

import {AuthenticationService} from "../../services/services/authentication.service";
import {AuthenticationResponse} from "../../services/models/authentication-response";
import {Router} from "@angular/router";
import {TokenService} from "../../services/token/token.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authRequest: AuthenticationRequest = { email: '', password: '' };
  errorMsg: Array<string> = [];
  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private tokenService:TokenService) {
  }
  login() {
    this.errorMsg=[];
    this.authenticationService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res:AuthenticationResponse) => {
        this.tokenService.token=res.token as string;
        this.router.navigate(['books'])
      },
      error: err => {
        console.log(err);
        if (err.error && err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
          console.log(this.errorMsg+'in');
        } else {
          this.errorMsg.push(err.error.error);
          console.log(this.errorMsg+'out');
        }
      }
    })
  }

  register() {
    this.router.navigate(['register']);
  }
}

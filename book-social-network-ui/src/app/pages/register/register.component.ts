import { Component } from '@angular/core';
import {RegistrationRequest} from "../../services/models/registration-request";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerRequest : RegistrationRequest ={email:'',firstname:'',lastname:'',password:''};
  errorMsg: Array<string> =[];
  constructor(
    private router : Router,
    private authService: AuthenticationService
  ) {
  }

  register() {
    this.errorMsg=[];
    this.authService.register({
      body:this.registerRequest
    }).subscribe({
      next:():void=>{
        this.router.navigate(['activate-account']);
      },
      error:(err):void=>{

        this.errorMsg = err.error.validationErrors;

      }
    })
  }

  login() {
    this.router.navigate(['login']);
  }
}

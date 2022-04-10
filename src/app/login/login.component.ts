import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { LoginRequest } from '../models/loginRequest';
import { LoginResponse } from '../models/loginResponse';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userCred: LoginRequest;
  userData: LoginResponse;
  currentUser: LoginResponse = new LoginResponse();
  credError: string = "";

  constructor(private primengConfig: PrimeNGConfig, private loginService: AuthService, private router:Router, private messageService: MessageService) { 
    this.userCred = new LoginRequest();
    this.userData = new LoginResponse();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.currentUser = JSON.parse(localStorage.getItem('userData') || '{}');

    if (Object.keys(this.currentUser).length > 0) {
      this.router.navigate(['/home']);
    }
  }

  showFailure() {
    this.messageService.add({severity:'error', summary:'Authentication Error', detail:'Login Failed'});
  }

  showSuccess() {
    console.log('success');
    this.messageService.add({severity:'sucess', summary:'Authentication Success', detail:'Welcome!'});
  }

  validateUser(form:NgForm){
    this.loginService.validateCredentials(this.userCred).subscribe((res) => {
      if (res.status === 200) {
        this.userData = res.body;
        localStorage.setItem('userData',JSON.stringify(this.userData));
        this.router.navigate(['/home']);
        this.showSuccess();
      }
    }, (error) => {
      console.log('error-----',error.message);
      this.credError=error.message
      this.showFailure();
    });
  }
}

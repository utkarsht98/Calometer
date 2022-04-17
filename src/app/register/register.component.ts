import { Component, OnInit } from '@angular/core';
import { AnyForUntypedForms, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { LoginResponse } from '../models/loginResponse';
import { Register } from '../models/register';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userReg: Register;
  currentUser: LoginResponse = new LoginResponse();
  regError: string = "";
;

  constructor(private primengConfig: PrimeNGConfig, private router:Router, private authService: AuthService, 
              private messageService: MessageService) {
    this.userReg = new Register();
   }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.currentUser = JSON.parse(localStorage.getItem('userData') || '{}');

    if (Object.keys(this.currentUser).length > 0) {
      this.router.navigate(['/home']);
    }
    
  }

  showFailure() {
    this.messageService.add({severity:'error', summary:'Error', detail:'Registeration Failed'});
  }

  registerUser(form: NgForm) {
    this.authService.addUser(this.userReg).subscribe((res) => {
        console.log('registered');
        this.router.navigate(['/']); // Will work to rdirect to homepage
    }, (error) => {
      this.regError = error.message;
      this.showFailure();
    });
  }
}

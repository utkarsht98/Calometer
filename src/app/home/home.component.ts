import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LoginResponse } from '../models/loginResponse';
import { Meals } from '../models/meals';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: MenuItem[] = [];
  meals: Meals[] = [];
  currentUser: LoginResponse = new LoginResponse();
  username: string = '';
  emptyMeals: string = '';

  constructor(private userSevrice: UserService, private router: Router) { }

  ngOnInit(): void {

    this.items = [{
      label: 'Account',
      items: [{
              label: 'Settings',
              icon: 'pi pi-refresh',
            },
            {
              label: 'Logout',
              icon: 'pi pi-sign-out',
              command: () => {
                this.userLogout();
            }
      }]
    }];

    this.currentUser = JSON.parse(localStorage.getItem('userData') || '{}');
    console.log('current---', this.currentUser);

    if (Object.keys(this.currentUser).length == 0) {
      this.router.navigate(['/']);
    }
    this.retrieveMeals();
  }

  retrieveMeals() {
    console.log('enter here---');
    this.username = this.currentUser.username || '{}';
    this.userSevrice.getMeals(this.username).subscribe((res) => {
      this.meals = res;
      console.log('meals---', this.meals);
    }, (error) => {
      console.log('error-----',error.message);
      this.emptyMeals=error.message
    });
  }

  userLogout(){
    localStorage.removeItem('userData');
    this.router.navigate(['/']);
  }
}

import { NgModule } from '@angular/core';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component'
import {HomeComponent} from './home/home.component'
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path:'',component:LoginComponent},
    { path:'home',component:HomeComponent},
    {path:'register', component:RegisterComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

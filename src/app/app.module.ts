import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from "primeng/inputtext";
import { InputNumberModule } from "primeng/inputnumber";
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';

import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    ButtonModule,
    PasswordModule,
    MessagesModule,
    ToolbarModule,
    TableModule,
    ToastModule,
    AvatarModule,
    MenuModule,
    AvatarGroupModule,
    RippleModule,
    MessageModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    HttpClientModule,
  ],
  exports: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
  ],
  providers: [AuthService, MessageService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

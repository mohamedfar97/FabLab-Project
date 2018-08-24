import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from "./services/auth.service";
import {HttpModule} from "@angular/http";
import {Routes , RouterModule} from "@angular/router"
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import * as Noty from 'noty';
import { ProfileComponent } from './profile/profile.component';

const appRoutes : Routes =[
{ path : '', component :  LoginComponent},
{ path : 'login', component :  LoginComponent },
{ path : 'signup', component : SignupComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {  }

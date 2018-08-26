import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './shared/login/login.component';
import { SignupComponent } from './shared/signup/signup.component';
import { AuthService } from "./services/auth.service";
import { GitLabService } from "./services/gitlab.service";
import {HttpModule} from "@angular/http";
import {Routes , RouterModule} from "@angular/router"
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import * as Noty from 'noty';
import { ProfileComponent } from './shared/profile/profile.component';
import { RepotreeComponent } from './gitlab/repotree/repotree.component';
import { HttpClientModule } from '@angular/common/http';

const appRoutes : Routes =[
{ path : '', component :  LoginComponent},
{ path : 'login', component :  LoginComponent },
{ path : 'signup', component : SignupComponent},
{ path : 'profile' , component: ProfileComponent},
{ path : 'repotree' , component : RepotreeComponent},
{path : 'repotree' , redirectTo : 'repotree' , pathMatch: 'prefix'}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    RepotreeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService,GitLabService],
  bootstrap: [AppComponent]
})
export class AppModule {  }

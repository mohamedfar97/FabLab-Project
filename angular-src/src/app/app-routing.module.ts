import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SignupComponent } from "./shared/signup/signup.component";
import { LoginComponent } from "./shared/login/login.component";
import { ProfileComponent } from "./shared/profile/profile.component";
import { EditProfileComponent } from "./shared/edit-profile/edit-profile.component";

import {ClientRegComponent} from "./forms/client-reg/client-reg.component";

import {LoggedInGuard} from "./services/guards/loggedInGuard.service";
import {NonLoggedInGuard} from "./services/guards/notLoggedInGuard.service";

const appRoutes : Routes = [
  { path : '', component :  LoginComponent },

  { path : 'login', canActivate: [NonLoggedInGuard], component :  LoginComponent },
  { path : 'signup', canActivate: [NonLoggedInGuard], component : SignupComponent },

  { path : 'profile', canActivate:[LoggedInGuard], component: ProfileComponent , children: [
      { path : 'editProfile', component: EditProfileComponent }
    ] },

  { path : 'forms/clientRegister' , component : ClientRegComponent }

];

@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule {}

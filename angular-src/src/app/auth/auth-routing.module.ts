import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";

import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";

import {LoggedInGuard} from "../services/guards/loggedInGuard.service";
import {NonLoggedInGuard} from "../services/guards/notLoggedInGuard.service";

const authRoutes:Routes = [
    { path : '', children : [
        { path : 'login', canActivate: [NonLoggedInGuard], component :  LoginComponent },
        { path : 'signup', canActivate: [NonLoggedInGuard], component : SignupComponent },
        { path : 'profile', canActivate:[LoggedInGuard], component: ProfileComponent , children: [
            { path : 'editProfile', component: EditProfileComponent }
          ] },
      ] },
]

@NgModule({
    imports : [
        RouterModule.forChild(authRoutes)
    ],
    exports : [
        RouterModule
    ]
})
export class AuthRoutingModule {}
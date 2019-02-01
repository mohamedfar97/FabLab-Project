import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
    declarations:[
        LoginComponent,
        SignupComponent,
        ProfileComponent,
        EditProfileComponent
    ],
    imports:[
        CommonModule,
        SharedModule,
        AuthRoutingModule
    ]
})
export class AuthModule {}
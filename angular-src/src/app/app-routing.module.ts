import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SignupComponent } from "./shared/signup/signup.component";
import { RepotreeComponent } from "./gitlab/repotree/repotree.component";
import { RepofileComponent } from "./gitlab/repofile/repofile.component";
import { RepofilesComponent } from "./gitlab/repofiles/repofiles.component";
import { LoginComponent } from "./shared/login/login.component";
import { ProfileComponent } from "./shared/profile/profile.component";
import { EditProfileComponent } from "./shared/edit-profile/edit-profile.component";

const appRoutes : Routes = [
  { path : '', component :  LoginComponent},
  { path : 'login', component :  LoginComponent },
  { path : 'signup', component : SignupComponent},
  { path : 'profile' , component: ProfileComponent},
  { path : 'profile/editProfile' , component: EditProfileComponent },
  { path : 'repotree' , component : RepotreeComponent},
  { path : 'repofiles' , component : RepofilesComponent},
  { path : 'repofile' , component : RepofileComponent}
];

@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule {

}

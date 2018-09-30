import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SignupComponent } from "./shared/signup/signup.component";
import { RepotreeComponent } from "./gitlab/repotree/repotree.component";
import { RepofileComponent } from "./gitlab/repofile/repofile.component";
import { RepofilesComponent } from "./gitlab/repofiles/repofiles.component";
import { LoginComponent } from "./shared/login/login.component";
import { ProfileComponent } from "./shared/profile/profile.component";
import { EditProfileComponent } from "./shared/edit-profile/edit-profile.component";
import { CommitsComponent } from "./gitlab/commits/commits.component";
import {FolderFilesComponent} from "./gitlab/repofiles/folder-files/folder-files.component";
import {InboxComponent} from "./messages/inbox/inbox.component";
import {SentboxComponent} from "./messages/sentbox/sentbox.component";
import {ComposeComponent} from "./messages/compose/compose.component";
import {ChatComponent} from "./chat/chat.component";

const appRoutes : Routes = [
  { path : '', component :  LoginComponent },
  { path : 'login', component :  LoginComponent },
  { path : 'signup', component : SignupComponent },
  { path : 'profile' , component: ProfileComponent },
  { path : 'profile/editProfile' , component: EditProfileComponent },
  { path : 'repotree' , component : RepotreeComponent },
  { path : 'repofiles' , component : RepofilesComponent },
  { path : 'repofile' , component : RepofileComponent },
  { path : 'commits' , component : CommitsComponent },
  { path : 'subdirectory' , component : FolderFilesComponent , runGuardsAndResolvers: 'always' },
  { path : 'messages/inbox' , component : InboxComponent},
  { path : 'messages/sentbox' , component : SentboxComponent},
  { path : 'messages/compose' , component : ComposeComponent},
  { path : 'discussions' , component : ChatComponent}
];

@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes
      , {onSameUrlNavigation: 'reload'})
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule {

}

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

import {ChatComponent} from "./discussions/chat/chat.component";


import {ClientRegComponent} from "./forms/client-reg/client-reg.component";
import {DiscussionsComponent} from "./discussions/discussions.component";
import {ViewMessageComponent} from "./messages/view-message/view-message.component";

import {LoggedInGuard} from "./services/guards/loggedInGuard.service";
import {NonLoggedInGuard} from "./services/guards/notLoggedInGuard.service";

const appRoutes : Routes = [
  { path : '', component :  LoginComponent },

  { path : 'login', canActivate: [NonLoggedInGuard], component :  LoginComponent },
  { path : 'signup', canActivate: [NonLoggedInGuard], component : SignupComponent },

  { path : 'profile', canActivate:[LoggedInGuard], component: ProfileComponent , children: [
      { path : 'editProfile', component: EditProfileComponent }
    ] },

  { path : 'subdirectory' , component : FolderFilesComponent , runGuardsAndResolvers: 'always' },

  { path : 'messages' , canActivate:[LoggedInGuard], children :[
      { path : 'inbox' , component : InboxComponent},
      { path : 'sentbox' , component : SentboxComponent},
      { path : 'compose' , component : ComposeComponent},
      { path : 'viewMessage', component : ViewMessageComponent}
    ]
  },

  { path : 'discussions', canActivate:[LoggedInGuard] , component : DiscussionsComponent},
  { path : 'discussion', canActivate:[LoggedInGuard] , component : ChatComponent},
  { path : 'forms/clientRegister' , component : ClientRegComponent }

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
export class AppRoutingModule {}

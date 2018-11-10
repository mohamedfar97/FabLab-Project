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

import {PendingUsersComponent} from "./admin/pending-users/pending-users.component";
import {UnverifiedUsersComponent} from "./admin/unverified-users/unverified-users.component";
import {ClientRegComponent} from "./forms/client-reg/client-reg.component";
import {DiscussionsComponent} from "./discussions/discussions.component";
import {ViewDiscussionComponent} from "./admin/view-discussion/view-discussion.component";
import {CreateDiscussionComponent} from "./admin/create-discussion/create-discussion.component";
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

  { path : 'repotree', canActivate:[LoggedInGuard] , component : RepotreeComponent },
  { path : 'repofiles', canActivate:[LoggedInGuard] , component : RepofilesComponent },
  { path : 'repofile', canActivate:[LoggedInGuard] , component : RepofileComponent },
  { path : 'commits', canActivate:[LoggedInGuard] , component : CommitsComponent },

  { path : 'subdirectory' , component : FolderFilesComponent , runGuardsAndResolvers: 'always' },

  { path : 'messages' , canActivate:[LoggedInGuard], children :[
      { path : 'inbox' , component : InboxComponent},
      { path : 'sentbox' , component : SentboxComponent},
      { path : 'compose' , component : ComposeComponent},
      { path : 'viewMessage', component : ViewMessageComponent}
    ]
  },

  { path : 'admin', canActivate:[LoggedInGuard] , children: [
      { path : 'pendingUsers', component : PendingUsersComponent },
      { path : 'unverifiedUsers', component : UnverifiedUsersComponent },
      { path : 'viewDiscussions', component : ViewDiscussionComponent },
      { path : 'createDiscussion', component : CreateDiscussionComponent }
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
export class AppRoutingModule {


}

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
  { path : 'messages/viewMessage' , component : ViewMessageComponent},
  { path : 'admin/pendingUsers' , component : PendingUsersComponent },
  { path : 'admin/unverifiedUsers' , component : UnverifiedUsersComponent },
  { path : 'admin/viewDiscussions' , component : ViewDiscussionComponent },
  { path : 'admin/createDiscussion' , component : CreateDiscussionComponent },
  { path : 'discussions' , component : DiscussionsComponent},
  { path : 'discussion' , component : ChatComponent},
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

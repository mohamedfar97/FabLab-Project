import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './shared/login/login.component';
import { SignupComponent } from './shared/signup/signup.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { RepotreeComponent } from './gitlab/repotree/repotree.component';
import { RepofilesComponent } from './gitlab/repofiles/repofiles.component';
import { RepofileComponent } from './gitlab/repofile/repofile.component';
import { SidebarComponent } from './header/sidebar/sidebar.component';

import { AuthService } from "./services/auth.service";
import { GitLabService } from "./services/gitlab.service";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { QuillModule } from "ngx-quill";
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgStringPipesModule } from 'angular-pipes';
import { EditProfileComponent } from './shared/edit-profile/edit-profile.component';
import { FirstNamePipe } from './services/pipes/first-name.pipe';
import { CapitalizeRolePipe } from './services/pipes/capitalize-role.pipe';
import { NgxSpinnerModule} from 'ngx-spinner';
import { SizePipePipe } from './services/pipes/size-pipe.pipe';
import { FileDropModule } from 'ngx-file-drop';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { CommitsComponent } from './gitlab/commits/commits.component';
import { FolderFilesComponent } from './gitlab/repofiles/folder-files/folder-files.component';
import { InboxComponent } from './messages/inbox/inbox.component';
import { SentboxComponent } from './messages/sentbox/sentbox.component';
import { ComposeComponent } from './messages/compose/compose.component';
import {MessagingService} from "./services/messaging.service";
import {ProjectDiscussionService} from "./services/project-discussion.service";
import { ContentPeekPipe } from './services/pipes/content-peek.pipe';
import {ChatComponent} from "./discussions/chat/chat.component";

import { ClientRegComponent } from './forms/client-reg/client-reg.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin/admin-header/admin-sidebar/admin-sidebar.component';
import { PendingUsersComponent } from './admin/pending-users/pending-users.component';
import {AdminService} from "./services/admin.service";
import { UnverifiedUsersComponent } from './admin/unverified-users/unverified-users.component';
import { DiscussionsComponent } from './discussions/discussions.component';
import { CreateDiscussionComponent } from './admin/create-discussion/create-discussion.component';
import { ViewDiscussionComponent } from './admin/view-discussion/view-discussion.component';
import { ViewMessageComponent } from './messages/view-message/view-message.component';


@NgModule({
  declarations: [
    ChatComponent,
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    RepotreeComponent,
    RepofilesComponent,
    RepofileComponent,
    SidebarComponent,
    EditProfileComponent,
    FirstNamePipe,
    CapitalizeRolePipe,
    SizePipePipe,
    CommitsComponent,
    FolderFilesComponent,
    InboxComponent,
    SentboxComponent,
    ComposeComponent,
    ContentPeekPipe,
    ClientRegComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    PendingUsersComponent,
    UnverifiedUsersComponent,
    DiscussionsComponent,
    CreateDiscussionComponent,
    ViewDiscussionComponent,
    ViewMessageComponent
  ],
  exports: [BsDropdownModule, TooltipModule]
  ,
  imports: [
    FileDropModule,
    NgxSpinnerModule,
    NgbModule,
    MDBBootstrapModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    QuillModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NgStringPipesModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    GitLabService,
    MessagingService,
    AdminService,
    ProjectDiscussionService,
    NgbModal],
  bootstrap: [AppComponent]
})
export class AppModule {  }

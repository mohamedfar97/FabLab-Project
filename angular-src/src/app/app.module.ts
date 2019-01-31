import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { QuillModule } from "ngx-quill";
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgStringPipesModule } from 'angular-pipes';
import { NgxSpinnerModule} from 'ngx-spinner';
import { FileDropModule } from 'ngx-file-drop';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from "./app-routing.module";
import { AdminModule } from './admin/admin.module';

import { AuthService } from "./services/auth.service";
import { AdminService } from "./services/admin.service";
import { GitLabService } from "./services/gitlab.service";
import { MessagingService } from "./services/messaging.service";
import { ProjectDiscussionService } from "./services/project-discussion.service";

import { LoggedInGuard } from './services/guards/loggedInGuard.service';
import { NonLoggedInGuard } from './services/guards/notLoggedInGuard.service';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './header/sidebar/sidebar.component';

import { LoginComponent } from './shared/login/login.component';
import { SignupComponent } from './shared/signup/signup.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { EditProfileComponent } from './shared/edit-profile/edit-profile.component';

import { RepotreeComponent } from './gitlab/repotree/repotree.component';
import { RepofilesComponent } from './gitlab/repofiles/repofiles.component';
import { RepofileComponent } from './gitlab/repofile/repofile.component';
import { CommitsComponent } from './gitlab/commits/commits.component';
import { FolderFilesComponent } from './gitlab/repofiles/folder-files/folder-files.component';

import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin/admin-header/admin-sidebar/admin-sidebar.component';

import { InboxComponent } from './messages/inbox/inbox.component';
import { SentboxComponent } from './messages/sentbox/sentbox.component';
import { ComposeComponent } from './messages/compose/compose.component';
import { ViewMessageComponent } from './messages/view-message/view-message.component';

import { ChatComponent } from "./discussions/chat/chat.component";
import { DiscussionsComponent } from './discussions/discussions.component';

import { ClientRegComponent } from './forms/client-reg/client-reg.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AdminHeaderComponent,
    AdminSidebarComponent,
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
    CommitsComponent,
    FolderFilesComponent,
    InboxComponent,
    SentboxComponent,
    ComposeComponent,
    ClientRegComponent,
    DiscussionsComponent,
    ViewMessageComponent
  ],
  exports: [BsDropdownModule, TooltipModule]
  ,
  imports: [
    BrowserModule,
    FileDropModule,
    NgxSpinnerModule,
    NgbModule,
    MDBBootstrapModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    QuillModule,
    HttpClientModule,
    HttpModule,
    NgStringPipesModule,
    AppRoutingModule,
    AdminModule,
    SharedModule
  ],
  providers: [
    ViewMessageComponent,
    LoggedInGuard,
    NonLoggedInGuard,
    AuthService,
    GitLabService,
    MessagingService,
    AdminService,
    ProjectDiscussionService,
    NgbModal],
  bootstrap: [AppComponent]
})
export class AppModule {  }

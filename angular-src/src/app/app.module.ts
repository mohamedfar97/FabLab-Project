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


@NgModule({
  declarations: [
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
    FolderFilesComponent
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
    QuillModule,
    NgStringPipesModule,
    AppRoutingModule
  ],
  providers: [AuthService , GitLabService , NgbModal],
  bootstrap: [AppComponent]
})
export class AppModule {  }

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
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { EditProfileComponent } from './shared/edit-profile/edit-profile.component';


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
    EditProfileComponent
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule]
  ,
  imports: [
    NgbModule.forRoot(),
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
    AppRoutingModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [AuthService,GitLabService],
  bootstrap: [AppComponent]
})
export class AppModule {  }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { Routes , RouterModule } from "@angular/router"
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from "ngx-quill";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './shared/login/login.component';
import { SignupComponent } from './shared/signup/signup.component';
import { AuthService } from "./services/auth.service";
import { GitLabService } from "./services/gitlab.service";
import { ProfileComponent } from './shared/profile/profile.component';
import { RepotreeComponent } from './gitlab/repotree/repotree.component';
import { RepofilesComponent } from './gitlab/repofiles/repofiles.component';
import { RepofileComponent } from './gitlab/repofile/repofile.component';
import { SidebarComponent } from './header/sidebar/sidebar.component';


import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

const appRoutes : Routes =[
{ path : '', component :  LoginComponent},
{ path : 'login', component :  LoginComponent },
{ path : 'signup', component : SignupComponent},
{ path : 'profile' , component: ProfileComponent},
{ path : 'repotree' , component : RepotreeComponent},
{ path : 'repofiles' , component : RepofilesComponent},
{path : 'repofile' , component : RepofileComponent}
]

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
    SidebarComponent
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule]
  ,
  imports: [
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    QuillModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    QuillModule
  ],
  providers: [AuthService,GitLabService],
  bootstrap: [AppComponent]
})
export class AppModule {  }

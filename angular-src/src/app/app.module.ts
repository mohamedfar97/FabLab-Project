import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule} from 'ngx-spinner';

// Unknown Purpose Modules
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Custom Modules
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { GitlabModule } from './gitlab/gitlab.module';
import { MessagesModule } from './messages/messages.module';
import { DiscussionsModule } from './discussions/discussions.module';

// General Use Services
import { AuthService } from "./services/auth.service";
import { GitLabService } from "./services/gitlab.service";

// Guards
import { LoggedInGuard } from './services/guards/loggedInGuard.service';
import { NonLoggedInGuard } from './services/guards/notLoggedInGuard.service';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './header/sidebar/sidebar.component';

import { LoginComponent } from './shared/login/login.component';
import { SignupComponent } from './shared/signup/signup.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { EditProfileComponent } from './shared/edit-profile/edit-profile.component';

import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin/admin-header/admin-sidebar/admin-sidebar.component';

import { ClientRegComponent } from './forms/client-reg/client-reg.component';


@NgModule({
  declarations: [
    AdminHeaderComponent,
    AdminSidebarComponent,
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    SidebarComponent,
    EditProfileComponent,
    ClientRegComponent
  ],
  exports: [BsDropdownModule, TooltipModule],
  imports: [
    BrowserModule,
    NgxSpinnerModule,
    NgbModule,
    MDBBootstrapModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    HttpModule,
    AppRoutingModule,
    AdminModule,
    GitlabModule,
    MessagesModule,
    DiscussionsModule,
    SharedModule
  ],
  providers: [
    LoggedInGuard,
    NonLoggedInGuard,
    AuthService,
    GitLabService,
    NgbModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule {  }

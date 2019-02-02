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
import { GitlabModule } from './gitlab/gitlab.module';
import { AuthModule } from './auth/auth.module';
// Services
import { AuthService } from "./services/auth.service";
import { GitLabService } from "./services/gitlab.service";
import { ProjectDiscussionService } from "./services/project-discussion.service";
import { AdminService } from "./services/admin.service";
import { MessagingService } from "./services/messaging.service";
// Guards
import { LoggedInGuard } from './services/guards/loggedInGuard.service';
import { NonLoggedInGuard } from './services/guards/notLoggedInGuard.service';

import { AppComponent } from './app.component';

import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/header/sidebar/sidebar.component';

import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin/admin-header/admin-sidebar/admin-sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    HeaderComponent,
    SidebarComponent
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
    GitlabModule,
    AuthModule,
    SharedModule
  ],
  providers: [
    LoggedInGuard,
    NonLoggedInGuard,
    AuthService,
    GitLabService,
    ProjectDiscussionService,
    AdminService,
    MessagingService,
    NgbModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule {  }

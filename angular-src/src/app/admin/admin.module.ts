import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";

import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin-header/admin-sidebar/admin-sidebar.component';
import { PendingUsersComponent } from './pending-users/pending-users.component';
import { UnverifiedUsersComponent } from './unverified-users/unverified-users.component';
import { CreateDiscussionComponent } from './create-discussion/create-discussion.component';
import { ViewDiscussionComponent } from './view-discussion/view-discussion.component';
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations:[
        PendingUsersComponent,
        UnverifiedUsersComponent,
        CreateDiscussionComponent,
        ViewDiscussionComponent
    ],
    imports:[
        CommonModule,
        SharedModule,
        AdminRoutingModule
    ]
})
export class AdminModule {}
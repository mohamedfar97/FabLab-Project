import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { SharedModule } from "../shared/shared.module";

import { AdminService } from "../services/admin.service";

import { PendingUsersComponent } from './pending-users/pending-users.component';
import { UnverifiedUsersComponent } from './unverified-users/unverified-users.component';
import { CreateDiscussionComponent } from './create-discussion/create-discussion.component';
import { ViewDiscussionComponent } from './view-discussion/view-discussion.component';

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
    ],
    providers:[
        AdminService
    ]
})
export class AdminModule {}
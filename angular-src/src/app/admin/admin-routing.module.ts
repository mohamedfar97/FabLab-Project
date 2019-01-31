import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import {LoggedInGuard} from "../services/guards/loggedInGuard.service";

import {PendingUsersComponent} from "./pending-users/pending-users.component";
import {UnverifiedUsersComponent} from "./unverified-users/unverified-users.component";
import {ViewDiscussionComponent} from "./view-discussion/view-discussion.component";
import {CreateDiscussionComponent} from "./create-discussion/create-discussion.component";

const adminRoutes:Routes = [
    { path : '', canActivate:[LoggedInGuard] , children: [
        { path : 'pendingUsers', component : PendingUsersComponent },
        { path : 'unverifiedUsers', component : UnverifiedUsersComponent },
        { path : 'viewDiscussions', component : ViewDiscussionComponent },
        { path : 'createDiscussion', component : CreateDiscussionComponent }
      ]
    },
]

@NgModule({
    imports:[
        RouterModule.forChild(adminRoutes)
    ],
    exports:[
        RouterModule
    ]
})
export class AdminRoutingModule {}
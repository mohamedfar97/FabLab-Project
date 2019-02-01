import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import {LoggedInGuard} from "../services/guards/loggedInGuard.service";

import {ChatComponent} from "./chat/chat.component";
import {DiscussionsComponent} from "./discussions.component";

const discussionsRoutes:Routes = [
    { path : '', canActivate:[LoggedInGuard] , component : DiscussionsComponent},
    { path : 'discussion', canActivate:[LoggedInGuard] , component : ChatComponent}
];

@NgModule({
    imports:[
        RouterModule.forChild(discussionsRoutes)
    ],
    exports:[
        RouterModule
    ]
})
export class DiscussionsRoutingModule {}
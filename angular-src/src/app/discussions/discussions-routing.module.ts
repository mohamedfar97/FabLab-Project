import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import {LoggedInGuard} from "../services/guards/loggedInGuard.service";

import {ChatComponent} from "./chat/chat.component";
import {DiscussionsComponent} from "./discussions.component";

const discussionsRoutes:Routes = [
    { path : '', canActivate:[LoggedInGuard], children : [
        { path : 'discussion', component : ChatComponent},
        { path : '', component : DiscussionsComponent}
    ]},
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
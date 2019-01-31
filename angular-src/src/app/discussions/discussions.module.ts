import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { DiscussionsRoutingModule } from "./discussions-routing.module";

import { ProjectDiscussionService } from "../services/project-discussion.service";
import { AdminService } from "../services/admin.service";

import { ChatComponent } from "./chat/chat.component";
import { DiscussionsComponent } from './discussions.component';

@NgModule({
    declarations:[
        ChatComponent,
        DiscussionsComponent
    ],
    imports:[
        CommonModule,
        SharedModule,
        DiscussionsRoutingModule
    ],
    providers:[
        ProjectDiscussionService,
        AdminService
    ]
})
export class DiscussionsModule {}
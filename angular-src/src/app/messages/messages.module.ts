import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuillModule } from "ngx-quill";

import { MessagesRoutingModule } from "./messages-routing.module";
import { SharedModule } from "../shared/shared.module";

import { InboxComponent } from './inbox/inbox.component';
import { SentboxComponent } from './sentbox/sentbox.component';
import { ComposeComponent } from './compose/compose.component';
import { ViewMessageComponent } from './view-message/view-message.component';

@NgModule({
    declarations:[
        InboxComponent,
        ViewMessageComponent,
        SentboxComponent,
        ComposeComponent
    ],
    imports:[
        CommonModule,
        SharedModule,
        QuillModule,
        MessagesRoutingModule
    ],
    providers:[
        ViewMessageComponent
    ]
})
export class MessagesModule {}
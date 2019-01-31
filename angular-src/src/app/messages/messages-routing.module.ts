import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import {LoggedInGuard} from "../services/guards/loggedInGuard.service";

import { InboxComponent } from './inbox/inbox.component';
import { SentboxComponent } from './sentbox/sentbox.component';
import { ComposeComponent } from './compose/compose.component';
import { ViewMessageComponent } from './view-message/view-message.component';

const messagesRoutes:Routes = [
    { path : 'messages' , canActivate:[LoggedInGuard], children :[
        { path : 'inbox' , component : InboxComponent},
        { path : 'sentbox' , component : SentboxComponent},
        { path : 'compose' , component : ComposeComponent},
        { path : 'viewMessage', component : ViewMessageComponent}
      ]
    }
]

@NgModule({
    imports:[
        RouterModule.forChild(messagesRoutes)
    ],
    exports:[RouterModule]
})
export class MessagesRoutingModule{}
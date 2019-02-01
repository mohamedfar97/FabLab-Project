import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./auth/login/login.component";

const appRoutes : Routes = [
  { path : '', loadChildren :  "./auth/auth.module#AuthModule" },
  { path: 'admin', loadChildren: "./admin/admin.module#AdminModule"},
  { path: 'gitlab', loadChildren: "./gitlab/gitlab.module#GitlabModule"},
  { path: 'discussions', loadChildren: "./discussions/discussions.module#DiscussionsModule"},
  { path: 'messages', loadChildren: "./messages/messages.module#MessagesModule"},
];

@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule {}

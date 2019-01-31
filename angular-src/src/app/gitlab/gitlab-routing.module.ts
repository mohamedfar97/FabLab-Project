import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import {LoggedInGuard} from "../services/guards/loggedInGuard.service";

import { RepotreeComponent } from '../gitlab/repotree/repotree.component';
import { RepofilesComponent } from '../gitlab/repofiles/repofiles.component';
import { RepofileComponent } from '../gitlab/repofile/repofile.component';
import { CommitsComponent } from '../gitlab/commits/commits.component';

const routes:Routes = [
    { path : 'repotree', canActivate:[LoggedInGuard] , component : RepotreeComponent },
    { path : 'repofiles', canActivate:[LoggedInGuard] , component : RepofilesComponent },
    { path : 'repofile', canActivate:[LoggedInGuard] , component : RepofileComponent },
    { path : 'commits', canActivate:[LoggedInGuard] , component : CommitsComponent },
]

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class GitlabRoutingModule {}
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import {LoggedInGuard} from "../services/guards/loggedInGuard.service";

import { RepotreeComponent } from './repotree/repotree.component';
import { RepofilesComponent } from './repofiles/repofiles.component';
import { RepofileComponent } from './repofile/repofile.component';
import { CommitsComponent } from './commits/commits.component';
import {FolderFilesComponent} from "./repofiles/folder-files/folder-files.component";

const gitlabRoutes:Routes = [
    { path : '' , canActivate : [LoggedInGuard] , children : [
        { path : 'repotree', component : RepotreeComponent },
        { path : 'repofiles', component : RepofilesComponent },
        { path : 'repofile', component : RepofileComponent },
        { path : 'commits' , component : CommitsComponent },
        { path : 'subdirectory' , component : FolderFilesComponent }
    ]},
]

@NgModule({
    imports:[
        RouterModule.forChild(gitlabRoutes)
    ],
    exports:[
        RouterModule
    ]
})
export class GitlabRoutingModule {}
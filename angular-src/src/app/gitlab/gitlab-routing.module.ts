import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import {LoggedInGuard} from "../services/guards/loggedInGuard.service";

import { RepotreeComponent } from './repotree/repotree.component';
import { RepofilesComponent } from './repofiles/repofiles.component';
import { RepofileComponent } from './repofile/repofile.component';
import { CommitsComponent } from './commits/commits.component';
import {FolderFilesComponent} from "./repofiles/folder-files/folder-files.component";

const gitlabRoutes:Routes = [
    { path : 'repotree', canActivate:[LoggedInGuard] , component : RepotreeComponent },
    { path : 'repofiles', canActivate:[LoggedInGuard] , component : RepofilesComponent },
    { path : 'repofile', canActivate:[LoggedInGuard] , component : RepofileComponent },
    { path : 'commits', canActivate:[LoggedInGuard] , component : CommitsComponent },
    { path : 'subdirectory' , component : FolderFilesComponent , runGuardsAndResolvers: 'always' },
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
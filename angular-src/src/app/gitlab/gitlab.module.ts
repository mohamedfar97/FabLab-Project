import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FileDropModule } from 'ngx-file-drop';
import { QuillModule } from "ngx-quill";

import { GitlabRoutingModule } from "./gitlab-routing.module";
import { SharedModule } from "../shared/shared.module";

import { RepotreeComponent } from '../gitlab/repotree/repotree.component';
import { RepofilesComponent } from '../gitlab/repofiles/repofiles.component';
import { RepofileComponent } from '../gitlab/repofile/repofile.component';
import { CommitsComponent } from '../gitlab/commits/commits.component';
import { FolderFilesComponent } from '../gitlab/repofiles/folder-files/folder-files.component';

@NgModule({
    declarations:[
        RepotreeComponent,
        RepofilesComponent,
        RepofileComponent,
        CommitsComponent,
        FolderFilesComponent
    ],
    imports:[
        CommonModule,
        FileDropModule,
        QuillModule,
        GitlabRoutingModule,
        SharedModule,
    ]
})
export class GitlabModule {}
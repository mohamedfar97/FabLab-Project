import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Params, Router} from "@angular/router";
import { GitLabService } from "../../../services/gitlab.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-folder-files',
  templateUrl: './folder-files.component.html',
  styleUrls: ['./folder-files.component.css']
})
export class FolderFilesComponent implements OnInit {

  projectId: string;
  fullPath: string;
  folderPath: string;

  folderFiles = [];
  treeFolderFiles = [];

  constructor(private gitLabService: GitLabService,
              private route: ActivatedRoute,
              private router: Router,
              private spinnerService: NgxSpinnerService) { }

  ngOnInit() {

    this.router.events
      .subscribe((event:any) => {
        if ( event instanceof NavigationEnd ) {
          
        }
      });

    this.route.queryParams
      .subscribe((queryParams: Params) => {
        this.projectId = queryParams['project_id'];
        this.fullPath = queryParams['full_path'];
        this.folderPath = queryParams['path'];
      });
    console.log(this.folderPath);

    this.spinnerService.show();
    this.gitLabService
      .getSubdirectoriesContent(this.projectId , this.folderPath)
      .subscribe( (res:any) => {
        this.spinnerService.hide();
        this.folderFiles = JSON.parse(res._body);

        for ( let i = 0; i < this.folderFiles.length; i++ ) {
          if ( this.folderFiles[i].type === "tree" ) {
            this.treeFolderFiles.push(this.folderFiles[i]);
            this.folderFiles.splice(i,1);
            i--;
          }
        }

      console.log(this.folderFiles);
      console.log(this.treeFolderFiles);

      }, (error) => {
        console.log(error);
      })
  }

  onOpenFile(file) {
    const urlEncodedPath = encodeURIComponent(file.path);
    console.log(urlEncodedPath);
    this.router.navigate(['/repofile'] ,
      {
        queryParams: {
          project_id : this.projectId,
          path: urlEncodedPath
        }
      });
  }

  onOpenFolder(folder) {
    const urlEncodedPath = encodeURIComponent(folder.path);
    console.log(urlEncodedPath);
    this.router.navigate(['/subdirectory'] ,
      {
        queryParams: {
          full_path: this.fullPath,
          project_id : this.projectId,
          path: urlEncodedPath
        }
      });
  }

}

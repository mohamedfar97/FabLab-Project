import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {GitLabService} from "../../../services/gitlab.service";
import {NgxSpinnerService} from "ngx-spinner";

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

  constructor(private gitLabService: GitLabService,
              private route: ActivatedRoute,
              private router: Router,
              private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe((queryParams: Params) => {
        this.projectId = queryParams['project_id'];
        this.fullPath = queryParams['full_path'];
        this.folderPath = queryParams['path'];
      });

    this.spinnerService.show();
    this.gitLabService
      .getSubdirectoriesContent(this.projectId , this.folderPath)
        .subscribe( (res:any) => {
          this.spinnerService.hide();
          this.folderFiles = JSON.parse(res._body)
          }, (error) => {
          console.log(error);
        })
  }

  onOpenFile(file) {
    console.log(file.path);
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

}

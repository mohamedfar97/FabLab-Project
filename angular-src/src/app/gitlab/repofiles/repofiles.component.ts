import { Component, OnInit } from '@angular/core';
import { GitLabService } from "../../services/gitlab.service";
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { saveAs } from 'file-saver/FileSaver';
import * as FileSaver from "file-saver";

@Component({
  selector: 'app-repofiles',
  templateUrl: './repofiles.component.html',
  styleUrls: ['./repofiles.component.css']
})

export class RepofilesComponent implements OnInit {
  project_id : string;
  fullPath : string;
  files = [];

  constructor(private gitLabService : GitLabService,
              private route:ActivatedRoute,
              private spinnerService: NgxSpinnerService) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe((queryParams : Params) => {
        this.project_id = queryParams['project_id'];
        this.fullPath = queryParams['fullPath'];
    });

    this.spinnerService.show();
    this.gitLabService.getProjectFiles(this.project_id)
      .subscribe((res : any) => {
        this.spinnerService.hide();
        this.files = JSON.parse(res._body);
        console.log(this.files);
    });
  }

  saveToFileSystem() {
    this.spinnerService.show();
    let projectName = "Project_" + this.project_id;
    this.gitLabService.downloadProject(this.project_id , projectName)
      .subscribe( (res:any) => {
        this.spinnerService.hide();
        let blob = new Blob([res._body]);
        FileSaver.saveAs(blob, projectName + '.tar');
      } , ( err ) => {
        console.log(err);
      });
  }
}

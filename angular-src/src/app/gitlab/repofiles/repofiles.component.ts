import { Component, OnInit } from '@angular/core';
import { GitLabService } from "../../services/gitlab.service";
import { ActivatedRoute, Params } from '@angular/router';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-repofiles',
  templateUrl: './repofiles.component.html',
  styleUrls: ['./repofiles.component.css']
})

export class RepofilesComponent implements OnInit {
  project_id : string;
  files = [];

  constructor(private gitLabService : GitLabService,
              private route:ActivatedRoute,
              private spinnerService: NgxSpinnerService) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe((queryParams : Params) => {
        this.project_id = queryParams['project_id'];
    });

    this.spinnerService.show();
    this.gitLabService.getProjectFiles(this.project_id)
      .subscribe((res : any) => {
        this.spinnerService.hide();
        this.files = JSON.parse(res._body);
        console.log(this.files);
    });
  }
}

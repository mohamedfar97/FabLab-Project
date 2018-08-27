import { Component, OnInit } from '@angular/core';
import { GitLabService } from "../../services/gitlab.service";
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-repofiles',
  templateUrl: './repofiles.component.html',
  styleUrls: ['./repofiles.component.css']
})
export class RepofilesComponent implements OnInit {

  project_id : string;
  files = [];

  constructor(private gitLabService : GitLabService,
              private route:ActivatedRoute) {


  }

  ngOnInit() {

    this.route.queryParams.subscribe((queryParams : Params) => {
    this.project_id = queryParams['project_id'];
    });

    this.gitLabService.getProjectFiles(this.project_id).subscribe((res : any)=>{
      this.files = JSON.parse(res._body);
      console.log(this.files);
    });

  }

}

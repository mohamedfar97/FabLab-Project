import { Component, OnInit } from '@angular/core';
import {GitLabService} from "../../services/gitlab.service";
import {ActivatedRoute, Params} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.css']
})
export class CommitsComponent implements OnInit {
  projectId: string;
  commits = [];
  searchCommits = [];

  constructor( private gitlabService: GitLabService,
               private spinnerService: NgxSpinnerService,
               private route: ActivatedRoute) { }

  ngOnInit() {
    this.spinnerService.show();
    this.route.queryParams
      .subscribe((queryParams: Params) => {
        this.projectId = queryParams['project_id'];
      });

    this.gitlabService.getProjectCommits(this.projectId)
      .subscribe((res: any) => {
        this.spinnerService.hide();
        this.commits = JSON.parse(res._body);
        this.searchCommits = JSON.parse(res._body);
      }, (error) => {
        console.log(error);
      });
  }

  searchCommitsByCommitMessage ( keyword: string ) {
    const tempKeyword = keyword.trim();
    for ( let i = 0 ; i < this.searchCommits.length ; i++ ) {
      if ( this.searchCommits[i].title.includes(tempKeyword) ) {
        this.searchCommits.splice(i, 1);
      }
    }
  }

}

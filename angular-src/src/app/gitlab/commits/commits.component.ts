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
  filterSelector ;
  searchField;

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

  SearchCommits (keyword: string) {
    const tempKeyword = keyword.trim();
    this.searchCommits = [];

      if (this.filterSelector){
        for ( let i = 0 ; i < this.commits.length ; i++ ) {
          if ( this.commits[i].author_name.includes(tempKeyword) || this.commits[i].author_name.toLowerCase().includes(tempKeyword)) {
            this.searchCommits.push(this.commits[i]);
          }
        }
      }else{
        for ( let i = 0 ; i < this.commits.length ; i++ ) {
          if ( this.commits[i].title.includes(tempKeyword) || this.commits[i].title.toLowerCase().includes(tempKeyword) ) {
            this.searchCommits.push(this.commits[i]);
          }
        }
      }


  }

  setradio(value : string){
    if(value === "name"){
      this.filterSelector = true;
    }else{
      this.filterSelector = false;
    }
    this.SearchCommits(this.searchField);
  }

}

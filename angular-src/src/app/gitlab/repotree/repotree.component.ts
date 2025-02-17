import { Component, OnInit } from '@angular/core';
import { GitLabService } from "../../services/gitlab.service";
import { ActivatedRoute, Params } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-repotree',
  templateUrl: './repotree.component.html',
  styleUrls: ['./repotree.component.css']
})
export class RepotreeComponent implements OnInit {

  groups = [];
  projects = [];
  rootId : number ;
  full_path = "";

  constructor(private gitLabService : GitLabService,
              private route:ActivatedRoute,
              private spinnerService: NgxSpinnerService) {

    this.route.queryParams
      .subscribe((queryParams: Params) => {
        this.full_path = queryParams['full_path'];

        if (!this.full_path) {
          this.full_path = 'Fablabs'
        }

        // SETTING THE ROOT ID WITH THE CURRENT FOLDER ID.
        for (let i = 0; i < this.groups.length; i++) {
          if (this.groups[i].full_path === this.full_path) {
            this.rootId = this.groups[i].id;
          }
        }
    });
  }

  ngOnInit() {
    this.spinnerService.show();

    this.gitLabService.getGroups()
      .subscribe((res : any) => {
        this.groups = JSON.parse(res._body);

        // WILL BE EXECUTED ONCE FOR THE "FABLABS" FOLDER
        for( let i = 0 ; i < this.groups.length ; i++ ) {
          if( !this.groups[i].parent_id ){
            this.rootId = this.groups[i].id;
          }
        }

        // SETTING THE ROOT ID WITH THE CURRENT FOLDER ID.
        for( let i = 0 ; i < this.groups.length ; i++ ) {
          if(this.groups[i].full_path === this.full_path ) {
            this.rootId = this.groups[i].id;
          }
        }
        console.log(this.groups);
    }, (err) => {
      alert(JSON.parse(err._body).errMsg);
    });

    this.gitLabService.getProjects()
      .subscribe((res : any) => {
        this.projects = JSON.parse(res._body);
        this.spinnerService.hide();
        console.log(this.projects);
    }, (err) => {
      alert(JSON.parse(err._body).errMsg);
    });
  }
}

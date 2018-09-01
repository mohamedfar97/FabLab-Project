import { Component, OnInit } from '@angular/core';
import {GitLabService} from "../../services/gitlab.service";
import {HeaderComponent} from "../header.component";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  rootId : number;
  groups = [];

  constructor(private gitlabService : GitLabService,
              private headerComponent : HeaderComponent) {
  }

  ngOnInit() {
    this.loadGroups();
  }

  loadGroups(){
    this.gitlabService.getGroups()
      .subscribe((res : any) => {
        this.groups = JSON.parse(res._body);
        console.log(this.groups);

        for( var i = 0 ; i < this.groups.length ; i++ ) {
          if( !this.groups[i].parent_id ){
            this.rootId = this.groups[i].id;
          }
        }
    });
  }
}

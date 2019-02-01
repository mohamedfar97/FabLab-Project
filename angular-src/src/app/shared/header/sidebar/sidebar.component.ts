import { Component, Input, OnInit } from '@angular/core';
import { GitLabService } from "../../../services/gitlab.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() sideStatus:string = "";
  rootId : number;
  groups = [];

  constructor(private gitlabService : GitLabService) {
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

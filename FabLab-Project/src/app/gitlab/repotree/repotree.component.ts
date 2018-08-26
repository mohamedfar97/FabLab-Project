import { Component, OnInit } from '@angular/core';
import {GitLabService} from "../../services/gitlab.service";
import {ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-repotree',
  templateUrl: './repotree.component.html',
  styleUrls: ['./repotree.component.css']
})
export class RepotreeComponent implements OnInit {

  groups = [];
  rootId : number ;
  full_path : string;

  constructor(private gitLabService : GitLabService,
              private route:ActivatedRoute  ) {

    this.route.queryParams.subscribe((queryParams : Params) => {

    this.full_path = queryParams['full_path'];
    if(!this.full_path){
      this.full_path = 'Fablabs'
    }
    for(var i = 0 ; i<this.groups.length ; i++){
      if(this.groups[i].full_path ===   this.full_path){
        this.rootId = this.groups[i].id;
      }
    }
    console.log(this.rootId);
    console.log(this.full_path);
    });
 }

  ngOnInit() {
    this.gitLabService.getGroups().subscribe((res : any)=>{
      this.groups = JSON.parse(res._body);
      
      for(var i = 0 ; i<this.groups.length ; i++){
        if(! this.groups[i].parent_id ){
          this.rootId = this.groups[i].id;
        }
      }
      console.log(this.groups);
    });

  }

}

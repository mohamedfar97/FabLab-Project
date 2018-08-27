import { Component, OnInit } from '@angular/core';
import {GitLabService} from "../../services/gitlab.service";
import {ActivatedRoute, Params} from '@angular/router';

import { QuillModule } from 'ngx-quill'


@Component({
  selector: 'app-repotree',
  templateUrl: './repotree.component.html',
  styleUrls: ['./repotree.component.css']
})
export class RepotreeComponent implements OnInit {

  groups = [];
  rootId : number ;

  constructor(private gitLabService : GitLabService,
              private route:ActivatedRoute  ) {
  }

  ngOnInit() {
    this.gitLabService.getNawwar()
      .subscribe((res:any)=> {
        console.log(JSON.parse(res._body).content);
      })
  }


}

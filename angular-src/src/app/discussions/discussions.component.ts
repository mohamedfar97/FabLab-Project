import { Component, OnInit } from '@angular/core';
import {AdminService} from "../services/admin.service";
import {ProjectDiscussionService} from "../services/project-discussion.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.css']
})
export class DiscussionsComponent implements OnInit {

  discussions = [];
  username: string;

  constructor(private discService: ProjectDiscussionService,
              private authService: AuthService) {}

  ngOnInit() {

    this.username = this.authService.getUserFromToken(sessionStorage.getItem("x-auth")).username;

    let body = {
      username: this.username
    };

    this.discService.viewUserDiscussions(body)
      .subscribe((res:any) => {
        this.discussions = JSON.parse(res._body).data;
      }, (err) => {
        alert(JSON.parse(err._body).errMsg);
      })
  }

  onLeaveDiscussion(discussion){

    let body = {
      username: this.username,
      disc: discussion.name
    };

    this.discService.leaveDiscussion(body)
      .subscribe((res:any) => {
        alert(JSON.parse(res._body).msg);
      }, (err) => {
        alert(JSON.parse(err._body).errMsg);
      })
  }

}

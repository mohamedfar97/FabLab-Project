import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-view-discussion',
  templateUrl: './view-discussion.component.html',
  styleUrls: ['./view-discussion.component.css']
})
export class ViewDiscussionComponent implements OnInit {

  discussions = [];
  adminId: string;

  constructor(private adminService: AdminService,
              private authService: AuthService) { }

  ngOnInit() {

    this.adminId = this.authService.getUserFromToken(sessionStorage.getItem("x-auth"))._id;

    this.adminService.viewDiscussions()
      .subscribe( (res:any) => {
        this.discussions = JSON.parse(res._body).data;
      } , (err) => {
        alert(JSON.parse(err._body).errMsg);
      })
  }

  onDeleteDiscussion( disc ) {

    let body = {
      disc: disc.name
    };

    this.adminService.deleteDiscussion(this.adminId,body)
      .subscribe((res:any) => {
        alert(JSON.parse(res._body).msg);
      } , (err) => {
        alert(JSON.parse(err._body).errMsg);
      })
  }

}

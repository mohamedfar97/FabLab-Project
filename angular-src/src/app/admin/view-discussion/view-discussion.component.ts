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

    this.adminService.viewDiscussions( this.adminId )
      .subscribe( (res:any) => {
        this.discussions = JSON.parse(res._body).data;
        console.log(this.discussions);
      } , (err) => {
        console.log(err);
      })
  }

}

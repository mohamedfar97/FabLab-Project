import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-pending-users',
  templateUrl: './pending-users.component.html',
  styleUrls: ['./pending-users.component.css']
})
export class PendingUsersComponent implements OnInit {

  pendingUsers = [];
  adminId: string;

  constructor(private adminService: AdminService,
              private authService: AuthService) { }

  ngOnInit() {

    this.adminId = this.authService.getUserFromToken(sessionStorage.getItem("x-auth"))._id;

    this.adminService.getPendingUsers( this.adminId )
      .subscribe( (res:any) => {
        this.pendingUsers = JSON.parse(res._body).data;
        console.log(this.pendingUsers);
      } , (err) => {
        alert(JSON.parse(err._body).errMsg);
      })
  }

  onAcceptUser( user ) {

    console.log(user);

    this.adminService
      .acceptOrDeclineUser(true,user._id,this.adminId)
      .subscribe((res:any) => {
        alert("User Accepted");
      }, (err) => {
        alert(JSON.parse(err._body).errMsg);
      })
  }

  onRejectUser( user ) {

    this.adminService
      .acceptOrDeclineUser(false,user._id,this.adminId)
      .subscribe((res:any) => {
        alert("User Rejected");
      }, (err) => {
        alert(JSON.parse(err._body).errMsg);
      })
  }

}

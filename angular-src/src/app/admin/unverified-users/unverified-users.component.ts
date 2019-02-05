import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-unverified-users',
  templateUrl: './unverified-users.component.html',
  styleUrls: ['./unverified-users.component.css']
})
export class UnverifiedUsersComponent implements OnInit {

  unverifiedUsers = [];
  adminId: string;

  constructor(private adminService: AdminService,
              private authService: AuthService) {}

  ngOnInit() {
    this.adminId = this.authService.getUserFromToken(sessionStorage.getItem("x-auth"))._id;

    this.adminService.viewUnverifiedUsers( this.adminId )
      .subscribe((res:any) => {
        this.unverifiedUsers = JSON.parse(res._body).data;
      }, (err) => {
        alert(JSON.parse(err._body).errMsg);
      })

  }

}

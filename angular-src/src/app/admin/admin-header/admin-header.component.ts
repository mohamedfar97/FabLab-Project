import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  status : string;
  user_id : string;
  user_name : string;
  adminStatus: string;

  constructor(private authService : AuthService,
              private router : Router) {
  }

  ngOnInit() {
    this.status = "active";
    if ( this.isLoggedIn() ) {
      this.user_id = this.authService.getUserFromToken(sessionStorage.getItem("x-auth"))._id;
      this.user_name = this.authService.getUserFromToken(sessionStorage.getItem("x-auth")).name;
      this.adminStatus = this.authService.getUserFromToken(sessionStorage.getItem("x-auth")).adminAccess;
      this.status = "";
    }
  }

  onHeaderToggle() {
    if (this.status === "active") {
      this.status = "";
    } else {
      this.status = "active";
    }
  }

  isLoggedIn(){
    return sessionStorage.getItem("x-auth");
  }

  isFullAdmin() {
    return (this.adminStatus === "full");
  }

  isHalfAdmin() {
    return (this.adminStatus === "half");
  }

  logOut(){
    this.authService.logOut();
    this.router.navigate(["/login"]);
  }

  onProfile(){
    this.router.navigate(["/profile"],
      { queryParams: {
          id: this.user_id
        }
      });
  }

  onEditProfile(){
    this.router.navigate(["/profile/editProfile"],
      { queryParams: {
          id: this.user_id
        }
      });
  }

}

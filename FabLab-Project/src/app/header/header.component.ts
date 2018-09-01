import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleClicked = new EventEmitter<{currentStatus : string}>();
  status : string;
  user_id : string;

  constructor(private authService : AuthService,
              private  router : Router) {
  }

  ngOnInit() {
    this.status = "active";
    this.user_id = this.authService.getUserFromToken(sessionStorage.getItem("x-auth"))._id;

  }

  onHeaderToggle() {
    if (this.status === "active") {
      this.status = "";
    } else {
      this.status = "active";
    }

    this.toggleClicked.emit({
      currentStatus : this.status
    });
  }

  isLoggedIn(){
    return sessionStorage.getItem("x-auth");
  }
  logOut(){
    this.authService.logOut();
    this.router.navigate(["/login"]);
  }

}

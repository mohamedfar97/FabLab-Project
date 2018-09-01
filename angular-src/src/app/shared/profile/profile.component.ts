import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute , Params } from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id : number;
  name : string;
  email : string;
  phone : string;
  role : string;

  user;

  constructor(private authService : AuthService,
              private route: ActivatedRoute ) {}

  ngOnInit() {

    this.user = this.authService.getUserFromToken(sessionStorage.getItem("x-auth"));
    this.name = this.user.name;
    this.id = this.user._id;


    this.route.queryParams
      .subscribe(
        (queryParams : Params) => {
          this.id = queryParams['id'];
    });

    this.authService.getProfile(this.id)
      .subscribe(
        (res : any) => {
          var user = JSON.parse(res._body);
          this.name = user.name;
          this.email = user.email;
          this.phone = user.phone;
          this.role = user.role;
          console.log(user);
        });
  }
}

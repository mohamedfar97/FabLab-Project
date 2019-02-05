import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id : string;
  name : string;
  email : string;
  phone : string;
  role : string;

  user;

  constructor(private authService : AuthService,
              private route: ActivatedRoute,
              private router : Router) {}

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
          let user = JSON.parse(res._body);
          this.name = user.name;
          this.email = user.email;
          this.phone = user.phone;
          this.role = user.role;
          console.log(user);
        } , (err) => {
          alert(JSON.parse(err._body).errMsg);
        });
  }

  onEditProfile(){
    this.router.navigate(["/profile/editProfile"],
      { queryParams: {
          id: this.id
        }
      });
  }
}

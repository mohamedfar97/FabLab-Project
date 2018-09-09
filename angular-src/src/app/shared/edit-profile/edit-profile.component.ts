import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import  {FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user:FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    this.user = new FormGroup({
      name: new FormControl('',Validators.required),
      phone: new FormControl('',[Validators.required,Validators.min(11)])
    });
  }

  onSubmit({value, valid}: { value: User, valid: boolean }) {
    if ( valid ) {
      this.editUser(value);
    } else {
      // ALERT MESSAGE TO BE ADDED
      console.log("Invalid Inputs");
    }
  }

  editUser( user:any ) {
    let body = {
      name:user.name,
      phone:user.phone
    };

    let id:string = "";

    this.route.queryParams
      .subscribe(
        (queryParams : Params) => {
          id = queryParams['id'];
        });

    this.authService.editProfile( id , body )
      .subscribe(
        (data) => {
          console.log(data);
          // sessionStorage.removeItem("x-auth");
          // sessionStorage.setItem("x-auth")
          this.router.navigate(['/profile'],{queryParams:{id}});
        },
        error => {
          // ALERT MESSAGE TO BE ADDED
          console.log(error);
        });
  }

}

export interface User {
  name: string;
  phone: string ;
}

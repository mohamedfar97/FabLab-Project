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
  id:string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    this.user = new FormGroup({
      name: new FormControl('',Validators.required),
      phone: new FormControl('',[Validators.required,Validators.min(11)])
    });

    this.route.queryParams
      .subscribe(
        (queryParams : Params) => {
          this.id = queryParams['id'];
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

    this.authService.editProfile( this.id , body )
      .subscribe(
        (res) => {
          sessionStorage.setItem("x-auth" , res.headers.get('x-auth') );
          this.router.navigate(['/profile'],{queryParams:{id:this.id}});
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

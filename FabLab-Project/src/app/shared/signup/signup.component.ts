import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router, ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as Noty from 'noty';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user:FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {

    this.user = new FormGroup({
      name: new FormControl('',Validators.required),
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      phone: new FormControl('',[Validators.required,Validators.min(11)]),
      role: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
    });
  }

  onSubmit({value, valid}: { value: User, valid: boolean }) {

    this.register(value);
  }

  register(user : any) {
    var phone = '0'+user.phone;
      this.authService.signUp(user.name, user.email, user.password, user.role, phone,user.gender)
        .subscribe(
          data => {
            this.router.navigate(['/login']);
          },
          error => {

              console.log(error);


  });
}
}


export interface User {

  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  gender: string;
  phone:any;
};

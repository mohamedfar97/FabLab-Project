import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
      username: new FormControl('',Validators.required),
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
    if ( valid ) {
      this.register(value);
    } else {
      alert("Invalid Inputs");
    }
  }

  register(user : any) {

    let body = {
      username:user.username,
      name:user.name,
      email:user.email,
      password:user.password,
      role:user.role,
      phone:user.phone,
      gender:user.gender
    };

    this.authService.signUp(body)
      .subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['/login']);
        },
        err => {
          alert(JSON.parse(err._body).errMsg);
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
  phone: string;
}

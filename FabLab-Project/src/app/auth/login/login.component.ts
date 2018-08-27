import {Component , OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import { NgForm } from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLogIn( form:NgForm ) {
    console.log("form");
    const email = form.value.email;
    const password = form.value.password;

    this.authService.logIn(email,password)
      .subscribe( (res) => console.log(res),
        (error) => console.log(error));
  }

}

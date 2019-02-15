import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarComponent } from "../../shared/header/sidebar/sidebar.component";
import { AuthService } from "../../services/auth.service";
import { HeaderComponent } from "../../shared/header/header.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:FormGroup;

  constructor(private authService: AuthService,
              private router: Router,
              private sidebar : SidebarComponent,
              private header : HeaderComponent) { }

  ngOnInit() {
    this.user = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  onLogIn({value, valid}: { value: User, valid: boolean }) {

    let body = {
      email: value.email,
      password: value.password
    };

    if ( valid ) {
      this.authService.logIn(body)
        .subscribe( (res) => {
          sessionStorage.setItem('x-auth',res.headers.get('x-auth'));
          var user = this.authService.getUserFromToken(sessionStorage.getItem('x-auth'));
          this.sidebar.loadGroups();
          this.header.user_name = user.name;
          this.header.adminStatus = user.adminAccess;


          this.router.navigate(['/profile'] , {queryParams : {id:user._id}});

        },(err) => {
          alert(JSON.parse(err._body).errMsg);
        } );
    } else {
      alert("Invalid Inputs");
    }
  }
}

export interface User {
  email: string;
  password: string;
}

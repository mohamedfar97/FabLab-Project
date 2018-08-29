import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SidebarComponent} from "../../header/sidebar/sidebar.component";
import {AuthService} from "../../services/auth.service";
import {GitLabService} from "../../services/gitlab.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:FormGroup;
  groups = [];

  constructor(private authService: AuthService,
              private router: Router,
              private  sidebar : SidebarComponent,
              private gitlabService : GitLabService) { }

  ngOnInit() {
    this.user = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }


  onLogIn({value, valid}: { value: User, valid: boolean }) {


    this.authService.logIn(value.email,value.password)
      .subscribe( (res) => {
          sessionStorage.setItem('x-auth',res.headers.get('x-auth'));
          var user = this.authService.getUserFromToken(sessionStorage.getItem('x-auth'));
          sessionStorage.setItem('name',user.name);
          this.sidebar.loadGroups();
          this.router.navigate(['/profile'] , {queryParams : {id:user._id}});
        },(error) => console.log(error) );




  }
}

export interface User {
  email: string;
  password: string;
}

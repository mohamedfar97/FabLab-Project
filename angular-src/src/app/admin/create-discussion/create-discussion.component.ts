import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {AdminService} from "../../services/admin.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-discussion',
  templateUrl: './create-discussion.component.html',
  styleUrls: ['./create-discussion.component.css']
})
export class CreateDiscussionComponent implements OnInit {

  disc: FormGroup;
  adminId: string;

  constructor(private authService: AuthService,
              private adminService: AdminService,
              private router: Router) { }

  ngOnInit() {

    this.adminId = this.authService.getUserFromToken(sessionStorage.getItem("x-auth"))._id;

    this.disc = new FormGroup({
      name: new FormControl('',Validators.required),
    });
  }

  onSubmit ( {value, valid}: { value: Disc, valid: boolean } ) {
    if ( valid ) {
      let discBody = {
        name: value.name
      };
      this.adminService.createDiscussion(this.adminId,discBody)
        .subscribe((res:any) => {
          console.log(JSON.parse(res._body).data);
          this.router.navigate(['/admin/viewDiscussions']);
        } , (err) => {
          alert(JSON.parse(err._body).errMsg);
        })
    } else {
      alert("Invalid Inputs");
    }
  }
}

export interface Disc {
  name: string;
}

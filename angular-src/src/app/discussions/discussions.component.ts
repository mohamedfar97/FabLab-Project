import { Component, OnInit } from '@angular/core';
import {AdminService} from "../services/admin.service";

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.css']
})
export class DiscussionsComponent implements OnInit {

  discussions = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {

    this.adminService.viewDiscussions()
      .subscribe((res:any) => {
        this.discussions = JSON.parse(res._body).data;
      }, (err) => {
        console.log(err);
      })

  }

}

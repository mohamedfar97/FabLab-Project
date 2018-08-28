import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  status : string ;

  constructor() { }

  ngOnInit() {

  }

  show(){
    this.status = "";
  }

  hide(){
    this.status = "active"

  }


}

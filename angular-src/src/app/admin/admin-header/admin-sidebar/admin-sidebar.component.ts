import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  @Input() sideStatus:string = "";

  constructor() { }

  ngOnInit() {
  }

}

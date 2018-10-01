import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.css']
})
export class DiscussionsComponent implements OnInit {

  discussions : Array<any>;
  constructor() {
    this.discussions = new Array<any>();
    this.discussions.push({
      room : "testProject"
    });
    this.discussions.push({
      room : "testProject2"
    });
  }

  ngOnInit() {

  }

}

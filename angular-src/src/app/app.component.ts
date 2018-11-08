import {Component, OnInit} from '@angular/core';
import {ProjectDiscussionService} from "./services/project-discussion.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'FabLab-Project';
  email = "";

  constructor(private socketService : ProjectDiscussionService){
    console.log(this.socketService.socket);
  }

  ngOnInit(){
  }
}

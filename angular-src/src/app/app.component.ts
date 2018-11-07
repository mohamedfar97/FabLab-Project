import {Component, OnInit} from '@angular/core';
import * as SocketIo from 'socket.io-client';
import {appConfig} from "./app.config";
import {ProjectDiscussionService} from "./services/project-discussion.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit(){
  }
  title = 'FabLab-Project';
  email = "";
}

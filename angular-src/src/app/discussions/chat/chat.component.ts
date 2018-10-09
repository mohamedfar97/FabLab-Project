import {Component, OnInit } from '@angular/core';
import * as SocketIo from 'socket.io-client';
import {appConfig} from "../../app.config";
import {AuthService} from "../../services/auth.service";
import {ProjectDiscussionService} from "../../services/project-discussion.service";
import {ActivatedRoute, Params} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit  {


  private newmessage;
  private room;
  private messages = Array<any>();
  private user;


  constructor(private authService: AuthService ,
              private socketService : ProjectDiscussionService,
              private route: ActivatedRoute) {

    this.user = this.authService.getUserFromToken(sessionStorage.getItem('x-auth'));

    this.route.queryParams
      .subscribe((queryParams: Params) => {
        this.room = queryParams['room'];
      });

    this.socketService.getTopMessages(this.room).subscribe((res : any) =>{
      this.messages = JSON.parse(res._body).data;


    })

    socketService.socket.emit("discussionRoom",{
      room : this.room
    });
  }

  ngOnInit() {

    this.socketService.socket.on('discussionMessage', (message) => {
      this.messages.push(message);
    });

  }



  send() {

    this.socketService.socket.emit('discussionMessage', {
      sender: this.user.username,
      project : this.room,
      message: this.newmessage,
      messageDate : new Date()
    });
    this.newmessage = "";
  }

  enterSend(event) {
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      document.getElementById("send").click();
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ProjectDiscussionService} from "../../services/project-discussion.service";
import {ActivatedRoute, Params} from "@angular/router";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit  {

  newMessage;
  room;
  messages = Array<any>();
  user;
  contributors = [];

  constructor(private authService: AuthService ,
              private socketService : ProjectDiscussionService,
              private route: ActivatedRoute) {

    this.user = this.authService.getUserFromToken(sessionStorage.getItem('x-auth'));

    this.route.queryParams
      .subscribe((queryParams: Params) => {
        this.room = queryParams['room'];
      });

    this.socketService.getTopMessages(this.room)
      .subscribe((res : any) => {
        this.messages = JSON.parse(res._body).data;
    });

    socketService.socket.emit('joinDiscussion', {
      room: this.room,
      userId: this.user._id,
      userUsername: this.user.username,
      userName: this.user.name
    });
  }

  ngOnInit() {
    this.socketService.socket.on('discussionMessage', (message) => {
      this.messages.push(message);
    });

    this.socketService.socket
      .on('errorMessage', (errorBody) => {
        alert(errorBody.errMsg);
        console.log(errorBody.err);
      });

    this.socketService.socket
      .on('updateContributors' , (newUser) => {
        this.contributors.push(newUser);
        console.log(this.contributors);
      })
  }

  send() {
    this.socketService.socket.emit('discussionMessage', {
      sender: this.user.username,
      discussion: this.room,
      message: this.newMessage,
      messageDate: new Date()
    });
    this.newMessage = "";
  }

  enterSend(event) {
    if (event.keyCode === 13) {
      document.getElementById("send").click();
    }
  }
}

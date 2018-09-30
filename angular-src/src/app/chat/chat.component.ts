import {Component, OnInit} from '@angular/core';
import * as SocketIo from 'socket.io-client';
import {appConfig} from "../app.config";
import {AuthService} from "../services/auth.service";
import {ProjectDiscussionService} from  "../services/project-discussion.service"
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {


  private message;


  constructor(private authService: AuthService ,
              private socketService : ProjectDiscussionService) {

  }

  ngOnInit() {
    let output = document.getElementById("output");

    this.socketService.socket.on('discussionMessage', (message) => {
      output.innerHTML += "<p><strong style='color: #7386D5;'>" + message.sender + "  </strong>" + message.message + "</p>";
    });
  }

  send() {
    let user = this.authService.getUserFromToken(sessionStorage.getItem('x-auth'));
    this.socketService.socket.emit('discussionMessage', {
      sender: user.username,
      project : "testProject",
      message: this.message,
      messageDate : new Date()
    });

    this.message = "";
  }

  enterSend(event) {
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      document.getElementById("send").click();
    }
  }
}

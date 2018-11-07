import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MessagingService} from "../../services/messaging.service";

@Component({
  selector: 'app-sentbox',
  templateUrl: './sentbox.component.html',
  styleUrls: ['./sentbox.component.css']
})
export class SentboxComponent implements OnInit {

  sentMessages = [];

  constructor(private messagingService: MessagingService,
              private authService: AuthService) { }

  ngOnInit() {

    let currentUsername = this.authService.getUserFromToken(sessionStorage.getItem("x-auth")).username;

    this.messagingService
      .getSentMessages(currentUsername)
      .subscribe((res:any) => {
        this.sentMessages = (JSON.parse(res._body)).data;
        console.log(this.sentMessages);
      }, (err) => {
        console.log(err);
      })
  }

  onDeleteMessage( message ){
    this.messagingService
      .deleteMessage(message._id)
      .subscribe((res:any) => {
        console.log(res);
      },(err) => {
        console.log(err);
      })
  }

}

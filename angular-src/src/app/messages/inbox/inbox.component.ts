import { Component, OnInit } from '@angular/core';
import {MessagingService} from "../../services/messaging.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  receivedMessages = [];

  constructor(private messagingService: MessagingService,
              private authService: AuthService) { }

  ngOnInit() {

    let currentUserEmail = this.authService.getUserFromToken(sessionStorage.getItem("x-auth")).email;

    this.messagingService
      .getReceivedMessages(currentUserEmail)
      .subscribe((res:any) => {
        this.receivedMessages = (JSON.parse(res._body)).data;
      }, (err) => {
        console.log(err);
      })
  }

}

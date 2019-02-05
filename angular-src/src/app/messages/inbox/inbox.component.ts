import { Component, OnInit } from '@angular/core';
import {MessagingService} from "../../services/messaging.service";
import {AuthService} from "../../services/auth.service";
import {ViewMessageComponent} from "../view-message/view-message.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  receivedMessages = [];

  constructor(private messagingService: MessagingService,
              private authService: AuthService,
              private viewMsg: ViewMessageComponent,
              private router: Router) { }

  ngOnInit() {

    let currentUsername = this.authService.getUserFromToken(sessionStorage.getItem("x-auth")).username;

    this.messagingService
      .getReceivedMessages(currentUsername)
      .subscribe((res:any) => {
        this.receivedMessages = (JSON.parse(res._body)).data;
      }, (err) => {
        alert(JSON.parse(err._body).errMsg);
      })
  }

  viewMessage( message ){

    this.router.navigate(['/messages/viewMessage'] ,
      {
        queryParams : {
          messageId: message._id
        }
      })

  }

}

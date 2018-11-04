import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {MessagingService} from "../../services/messaging.service";

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.css']
})
export class ViewMessageComponent implements OnInit {

  messageId: string;
  messageBody = {
    message : "",
    sender: String,
    subject: String,
    messageDate: Date
  };

  constructor(private route:ActivatedRoute,
              private messagingService: MessagingService) { }

  ngOnInit() {

    this.route.queryParams
      .subscribe((queryParams: Params) => {
        this.messageId = queryParams['messageId'];
      });

    this.messagingService
      .viewMessage(this.messageId)
      .subscribe((res:any) => {
        this.messageBody = JSON.parse(res._body).data;
        console.log(this.messageBody);

        document.getElementById("text")
          .innerHTML = this.messageBody.message;

      },(err) => {
        console.log(err);
      })
  }

}

import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

import { appConfig } from "../app.config";

@Injectable()
export class MessagingService {
  constructor(private http: Http){}

  sendMessage( body ) {
    return this.http
      .post(appConfig.apiUrl + 'messages/sendMessage', body)
      .pipe();
  };

  getSentMessages( email: string ) {
    return this.http
      .get(appConfig.apiUrl + 'messages/getSentMessages/' + email)
      .pipe();
  };

  getReceivedMessages( email: string ) {
    return this.http
      .get(appConfig.apiUrl + 'messages/getReceivedMessages/' + email)
      .pipe();
  };

  deleteMessage( messageId: string ) {
    return this.http
      .delete(appConfig.apiUrl + 'messages/deleteMessage/' + messageId )
      .pipe();
  }

}

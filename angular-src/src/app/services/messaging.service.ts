import { Injectable } from '@angular/core';
import { Http,Headers, RequestOptions } from "@angular/http";

import { AuthService } from './auth.service';
import { appConfig } from "../app.config";

@Injectable()
export class MessagingService {

  userToken = sessionStorage.getItem("x-auth");
  headers = new Headers ({
    'x-auth': this.userToken
  });
  httpOptions = new RequestOptions({
    headers: this.headers
  });

  constructor(private http: Http,
              private authService:AuthService){}

  sendMessage( body ) {
    return this.http
      .post(appConfig.apiUrl + 'messages/sendMessage', body, this.httpOptions)
      .pipe();
  };

  getSentMessages( email: string ) {
    return this.http
      .get(appConfig.apiUrl + 'messages/getSentMessages/' + email ,this.httpOptions)
      .pipe();
  };

  getReceivedMessages( email: string ) {
    return this.http
      .get(appConfig.apiUrl + 'messages/getReceivedMessages/' + email, this.httpOptions)
      .pipe();
  };

  deleteMessage( messageId: string ) {
    return this.http
      .delete(appConfig.apiUrl + 'messages/deleteMessage/' + messageId, this.httpOptions )
      .pipe();
  }

  viewMessage( messageId: string ) {
    return this.http
      .get(appConfig.apiUrl + 'messages/viewMessage/' + messageId, this.httpOptions)
      .pipe();
  }

}

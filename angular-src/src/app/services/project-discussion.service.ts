import { Injectable } from '@angular/core';
import * as SocketIo from 'socket.io-client';
import { appConfig } from "../app.config";
import { Http, Headers, RequestOptions } from "@angular/http";;

@Injectable()
export class ProjectDiscussionService{

  userToken = sessionStorage.getItem("x-auth");
  headers = new Headers ({
    'Authorization': this.userToken
  });
  httpOptions = new RequestOptions({
    headers: this.headers
  });

  socket = SocketIo(appConfig.apiUrl);

  constructor(private http : Http) {}

  getTopMessages( discussion ){
    return this.http
      .get(appConfig.apiUrl + "messages/getDiscussionTopMessages/" + discussion , this.httpOptions)
      .pipe();
  }

  viewUserDiscussions( body ) {
    return this.http
      .post(appConfig.apiUrl + "messages/userDiscussions", body, this.httpOptions)
      .pipe();
  }

  leaveDiscussion( body ) {
    return this.http
      .post(appConfig.apiUrl + "messages/leaveDiscussion", body, this.httpOptions)
      .pipe();
  }
}

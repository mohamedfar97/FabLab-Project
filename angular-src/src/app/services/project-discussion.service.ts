import {Injectable} from '@angular/core';
import * as SocketIo from 'socket.io-client';
import {SocketIoClient} from 'socket.io-client';
import {appConfig} from "../app.config";
import { Http , Headers } from "@angular/http";

@Injectable()
export class ProjectDiscussionService{

  socket = SocketIo(appConfig.apiUrl);
  headers = new Headers ({
    'Content-Type': 'application/json'
  });

  constructor(private http : Http) {}

  getTopMessages( discussion ){
    return this.http
      .get(appConfig.apiUrl + "messages/getDiscussionTopMessages/" + discussion , {headers : this.headers})
      .pipe();
  }

  viewUserDiscussions( body ) {
    return this.http
      .post(appConfig.apiUrl + "messages/userDiscussions", body)
      .pipe();
  }

  leaveDiscussion( body ) {
    return this.http
      .post(appConfig.apiUrl + "messages/leaveDiscussion", body)
      .pipe();
  }
}

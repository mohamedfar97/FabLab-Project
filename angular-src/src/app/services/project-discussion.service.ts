import { Injectable } from '@angular/core';
import * as SocketIo from 'socket.io-client';
import {SocketIoClient} from 'socket.io-client';
import {appConfig} from "../app.config";
import { Http , Headers } from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class ProjectDiscussionService {
   socket : SocketIoClient.Socket;

  constructor(private http : Http) {
    this.socket = SocketIo(appConfig.apiUrl);
  }

  headers = new Headers ({
    'Content-Type': 'application/json'
  });

  getTopMessages( discussion ){
    return this.http
      .get(appConfig.apiUrl + "messages/getDiscussionTopMessages/" + discussion , {headers : this.headers})
      .pipe();
  }
}

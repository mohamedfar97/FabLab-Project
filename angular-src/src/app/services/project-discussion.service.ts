import { Injectable } from '@angular/core';
import * as SocketIo from 'socket.io-client';
import {SocketIoClient} from 'socket.io-client';
import {appConfig} from "../app.config";

@Injectable({
  providedIn: 'root'
})
export class ProjectDiscussionService {
   socket : SocketIoClient.Socket;

  constructor() {
    this.socket = SocketIo(appConfig.apiUrl);
  }
}

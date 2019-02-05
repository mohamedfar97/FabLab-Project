import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";

import { appConfig } from "../app.config";

@Injectable()
export class AuthService {

  userToken = sessionStorage.getItem("x-auth");
  headers = new Headers ({
    'x-auth': this.userToken
  });
  httpOptions = new RequestOptions({
    headers: this.headers
  });

  constructor(private http:Http){};

  signUp( user ) {
    return this.http.post(appConfig.apiUrl + "register", user, this.httpOptions )
    .pipe();
  }

  logIn( user ) {
    return this.http.post(appConfig.apiUrl + "logIn", user, this.httpOptions )
    .pipe();
  }

  getProfile( id ){
    return this.http.get(appConfig.apiUrl + "profile/" + id , this.httpOptions )
    .pipe();
  }

  editProfile ( id , body ) {
    return this.http.post(appConfig.apiUrl + "editProfile/" + id , body, this.httpOptions )
    .pipe();
  }

  logOut(){
    localStorage.clear();
    sessionStorage.clear();
  }

  public getUserFromToken(token: any): any {
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

}

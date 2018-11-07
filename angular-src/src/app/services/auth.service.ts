import { Injectable } from '@angular/core';
import { Http , Headers } from "@angular/http";

import { appConfig } from "../app.config";

@Injectable()
export class AuthService {
  constructor(private http:Http){};

   headers = new Headers ({
    'Content-Type': 'application/json'
  });

  signUp( user ) {
    return this.http.post(appConfig.apiUrl + "register", user, {headers:this.headers}).pipe();
  }

  logIn( user ) {
    return this.http.post(appConfig.apiUrl + "logIn", user, {headers:this.headers}).pipe();
  }

  getProfile( id ){
    return this.http.get(appConfig.apiUrl + "profile/" + id , {headers:this.headers}).pipe();
  }

  editProfile ( id , body ) {
    return this.http.post(appConfig.apiUrl + "editProfile/" + id , body,{headers:this.headers}).pipe();
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

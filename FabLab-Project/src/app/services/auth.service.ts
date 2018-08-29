import { Injectable } from '@angular/core';
import { Http , Headers } from '@angular/http';
import { appConfig } from "../app.config";

@Injectable()
export class AuthService {
  constructor(private http:Http){};

   headers = new Headers ({
    'Content-Type': 'application/json'
  })


  logOut(){
     localStorage.clear();
     sessionStorage.clear();

  }


  signUp( name:String, email:String, password: String , role:String , phone:String, gender:String ) {

    let body = {
      name:name,
      email:email,
      password:password,
      role:role,
      phone:phone,
      gender:gender
    }
    return this.http.post(appConfig.apiUrl + "register", body, {headers:this.headers}).pipe();
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

  logIn( email:String , password:String ) {

    let body = {
      email:email,
      password:password
    }
    return this.http.post(appConfig.apiUrl + "logIn", body, {headers:this.headers}).pipe();
  }

  getProfile(id){
    return this.http.get(appConfig.apiUrl + "profile/" + id , {headers:this.headers}).pipe();
  }


}

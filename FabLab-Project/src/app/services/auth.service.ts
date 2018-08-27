import {Injectable} from '@angular/core';
import { Http , Headers } from '@angular/http';

@Injectable()
export class AuthService {
  constructor(private http:Http){};

   headers = new Headers ({
    'Content-Type': 'application/json'
  })

  signUp( name:String, email:String, password: String , role:String , phone:String, gender:String ) {

    let body = {
      name:name,
      email:email,
      password:password,
      role:role,
      phone:phone,
      gender:gender
    }
    return this.http.post("http://localhost:3000/register", body, {headers:this.headers}).pipe();
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
    return this.http.post("http://localhost:3000/logIn", body, {headers:this.headers}).pipe();
  }

  getProfile(id){
    return this.http.get("http://localhost:3000/profile/"+id, {headers:this.headers}).pipe();
  }

}

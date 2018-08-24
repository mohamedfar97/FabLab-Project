import {Injectable} from '@angular/core';
import { Http , Headers } from '@angular/http';

@Injectable()
export class AuthService {
  constructor(private http:Http){};

  signUp( name:String, email:String, password: String , role:String , phone:String, gender:String ) {
    const headers = new Headers ({
      'Content-Type': 'application/json'
    })
    let body = {
      name:name,
      email:email,
      password:password,
      role:role,
      phone:phone,
      gender:gender
    }
    return this.http.post("http://localhost:3000/register", body, {headers:headers}).pipe();
  }

  logIn( email:String , password:String ) {
    const headers = new Headers ({
      'Content-Type': 'application/json'
    })
    let body = {
      email:email,
      password:password
    }
    return this.http.post("http://localhost:3000/logIn", body, {headers:headers}).pipe();
  }

}

import {Injectable} from '@angular/core';
import { Http , Headers } from '@angular/http';

@Injectable()
export class GitLabService {
  constructor(private http:Http){};


  getGroups(){
    return this.http.get("https://cors-anywhere.herokuapp.com/https://www.gitlab.com/api/v4/groups/?private_token=bXnG_t4YzxAaytvvLLAy").pipe();
  }
  
}

import {Injectable} from '@angular/core';
import { Http , Headers } from '@angular/http';

@Injectable()
export class GitLabService {
  constructor(private http:Http){};

  private_token :string = "bXnG_t4YzxAaytvvLLAy";

  getGroups(){
    return this.http.get("https://cors-anywhere.herokuapp.com/https://www.gitlab.com/api/v4/groups/?private_token=" + this.private_token).pipe();
  }

  getProjects(){
    return this.http.get("https://cors-anywhere.herokuapp.com/https://www.gitlab.com/api/v4/projects/?membership=true&private_token=" + this.private_token).pipe();
  }

  getNawwar(){
    return this.http.get("https://cors-anywhere.herokuapp.com/https://www.gitlab.com/api/v4/projects/7922086/repository/files/nawwarLogo.png?private_token=bXnG_t4YzxAaytvvLLAy&per_page=100&ref=master")
  }



}

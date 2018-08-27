import {Injectable} from '@angular/core';
import { Http , Headers } from '@angular/http';

@Injectable()
export class GitLabService {
  constructor(private http:Http){

  };

  getGroups(){
    return this.http.get("https://cors-anywhere.herokuapp.com/https://www.gitlab.com/api/v4/groups/?private_token=bXnG_t4YzxAaytvvLLAy").pipe();
  }

  getProjects(){
    return this.http.get("https://cors-anywhere.herokuapp.com/https://www.gitlab.com/api/v4//projects/?membership=true&private_token=bXnG_t4YzxAaytvvLLAy&simple=true").pipe();
  }

  getProjectFiles(project_id : string){
    return this.http.get("https://cors-anywhere.herokuapp.com/https://www.gitlab.com/api/v4//projects/7922086/repository/tree/?private_token=bXnG_t4YzxAaytvvLLAy&per_page=100").pipe();
  }

  getFile(project_id : string , path : string){
    return this.http.get("https://cors-anywhere.herokuapp.com/https://www.gitlab.com/api/v4//projects/"+project_id+"/repository/files/"+path+"/?private_token=bXnG_t4YzxAaytvvLLAy&ref=master").pipe();
  }
}

import { Injectable } from '@angular/core';
import { Http , Headers } from '@angular/http';
import { appConfig } from '../app.config';

@Injectable()
export class GitLabService {

  constructor(private http:Http){};

  getGroups(){
    return this.http.get(appConfig.corsApi + "https://www.gitlab.com/api/v4/groups/?private_token=" + appConfig.private_token).pipe();
  }

  getProjects(){
    return this.http.get(appConfig.corsApi + "https://www.gitlab.com/api/v4/projects/?membership=true&private_token=" + appConfig.private_token).pipe();
  }

  getProjectFiles(project_id : string){
    return this.http.get(appConfig.corsApi + "https://www.gitlab.com/api/v4//projects/7922086/repository/tree/?per_page=100&private_token=" + appConfig.private_token ).pipe();
  }

  getFile(project_id : string , path : string){
    return this.http.get(appConfig.corsApi + "https://www.gitlab.com/api/v4//projects/"+project_id+"/repository/files/"+path+"/?ref=master&private_token=" + appConfig.private_token ).pipe();
  }

}

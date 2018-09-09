import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

import { appConfig } from '../app.config';

@Injectable()
export class GitLabService {

  constructor(private http:Http){};

  getGroups(){
    return this.http
      .get(appConfig.apiUrl + "gitlab/getGroups/" + appConfig.private_token)
      .pipe();
  }

  getProjects(){
    return this.http
      .get(appConfig.apiUrl + "gitlab/getProjects/" + appConfig.private_token)
      .pipe();
  }

  getProjectFiles( projectId : string ){
    return this.http
      .get(appConfig.apiUrl + "gitlab/getProjectFiles/" + appConfig.private_token + "/" + projectId )
      .pipe();
  }

  getFile( projectId : string , path : string ){
    return this.http
      .get(appConfig.apiUrl + "gitlab/getFile/" + appConfig.private_token + "/" + projectId + "/" + path)
      .pipe();
  }

  uploadFile(projectId : string , body ){
    return this.http
      .post(appConfig.apiUrl + "gitLab/uploadFile/" + appConfig.private_token + "/" + projectId ,body)
      .pipe();
  }

  downloadProject( projectId : string , projectName : string ){
    return this.http
      .get(appConfig.apiUrl + "gitlab/downloadProject/" + appConfig.private_token + "/" + projectId
        + "/" + projectName)
      .pipe();
  }

  getProjectCommits(projectId : string ){
    return this.http
      .get(appConfig.apiUrl + "gitlab/getProjectCommits/" + appConfig.private_token + "/" + projectId)
      .pipe();
  }
}

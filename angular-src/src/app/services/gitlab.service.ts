import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

import { appConfig } from '../app.config';

@Injectable()
export class GitLabService {

  constructor(private http:Http){};

  getGroups(){
    return this.http
      .get(appConfig.apiUrl + "gitLab/getGroups/" + appConfig.private_token)
      .pipe();
  }

  getProjects(){
    return this.http
      .get(appConfig.apiUrl + "gitLab/getProjects/" + appConfig.private_token)
      .pipe();
  }

  getProjectFiles( projectId : string ){
    return this.http
      .get(appConfig.apiUrl + "gitLab/getProjectFiles/" + appConfig.private_token + "/" + projectId )
      .pipe();
  }

  getFile( projectId : string , path : string ){
    return this.http
      .get(appConfig.apiUrl + "gitLab/getFile/" + appConfig.private_token + "/" + projectId + "/" + path)
      .pipe();
  }

}

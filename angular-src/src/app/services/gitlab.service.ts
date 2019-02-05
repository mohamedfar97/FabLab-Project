import { Injectable } from '@angular/core';
import { Http, 
        ResponseContentType,
        Headers,
        RequestOptions
        } from "@angular/http";

import { appConfig } from '../app.config';


import { HttpClient , HttpRequest } from "@angular/common/http";

@Injectable()
export class GitLabService {

  userToken = sessionStorage.getItem("x-auth");
  headers = new Headers ({
    'x-auth': this.userToken
  });
  httpOptions = new RequestOptions({
    headers: this.headers
  });

  constructor(private http:Http,
    private httpClient : HttpClient) {};

  getGroups(){
    return this.http
      .get(appConfig.apiUrl + "gitlab/getGroups/" + appConfig.private_token, this.httpOptions)
      .pipe();
  }

  getProjects(){
    return this.http
      .get(appConfig.apiUrl + "gitlab/getProjects/" + appConfig.private_token, this.httpOptions)
      .pipe();
  }

  getProjectFiles( projectId : string ){
    return this.http
      .get(appConfig.apiUrl + "gitlab/getProjectFiles/" + appConfig.private_token + "/" + projectId, this.httpOptions )
      .pipe();
  }

  getFile( projectId : string , path : string ){
    return this.http
      .get(appConfig.apiUrl + "gitlab/getFile/" + appConfig.private_token + "/" + projectId + "/" + path, this.httpOptions)
      .pipe();
  }

  // ADD USER TOKEN
  uploadFile(projectId : string , body ){
    const req = new HttpRequest('POST', appConfig.apiUrl + "gitLab/uploadFile/" + appConfig.private_token + "/" + projectId, body, {
      reportProgress: true,
    });


    return this.httpClient.request(req).pipe();
  }

   // ADD USER TOKEN
  downloadProject( projectId : string , projectName : string, commitId : string ){
   
    if ( commitId ) {
      return this.http
      .get(appConfig.apiUrl + "gitlab/downloadProject/" + appConfig.private_token + "/" + projectId
        + "/" + projectName + "/" + commitId ,{ responseType: ResponseContentType.Blob })
      .pipe();
    }
    else {
      return this.http
      .get(appConfig.apiUrl + "gitlab/downloadProject/" + appConfig.private_token + "/" + projectId
        + "/" + projectName ,{ responseType: ResponseContentType.Blob })
      .pipe();
    }

  }

  getProjectCommits(projectId : string ){
    return this.http
      .get(appConfig.apiUrl + "gitlab/getProjectCommits/" + appConfig.private_token + "/" + projectId, this.httpOptions)
      .pipe();
  }

  getSubdirectoriesContent( projectId : string , path : string ) {
    return this.http
      .get(appConfig.apiUrl + 'gitlab/getSubdirectoriesContent/' + appConfig.private_token
        + '/' + projectId + '/' + path, this.httpOptions)
    .pipe();
  }

}

import { Injectable } from '@angular/core';
import {Http, ResponseContentType} from "@angular/http";
import { appConfig } from '../app.config';


import {HttpClient , HttpRequest , HttpResponse , HttpEventType} from "@angular/common/http";

@Injectable()
export class GitLabService {

  constructor(private http:Http,
    private httpClient : HttpClient) {};

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
    const req = new HttpRequest('POST', appConfig.apiUrl + "gitLab/uploadFile/" + appConfig.private_token + "/" + projectId, body, {
      reportProgress: true
    });


    return this.httpClient.request(req).pipe();
  }

  downloadProject( projectId : string , projectName : string ){
    return this.http
      .get(appConfig.apiUrl + "gitlab/downloadProject/" + appConfig.private_token + "/" + projectId
        + "/" + projectName ,{ responseType: ResponseContentType.Blob })
      .pipe();
  }

  getProjectCommits(projectId : string ){
    return this.http
      .get(appConfig.apiUrl + "gitlab/getProjectCommits/" + appConfig.private_token + "/" + projectId)
      .pipe();
  }

  getSubdirectoriesContent( projectId : string , path : string ) {
    return this.http
      .get(appConfig.apiUrl + 'gitlab/getSubdirectoriesContent/' + appConfig.private_token
        + '/' + projectId + '/' + path)
    .pipe();
  }

}

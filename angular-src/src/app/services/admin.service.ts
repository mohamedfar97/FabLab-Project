import { Injectable } from '@angular/core';
import { Http,Headers, RequestOptions } from "@angular/http";

import { appConfig } from "../app.config";

@Injectable()
export class AdminService {

  userToken = sessionStorage.getItem("x-auth");
  headers = new Headers ({
    'Authorization': this.userToken
  });
  httpOptions = new RequestOptions({
    headers: this.headers
  });

  constructor(private http: Http){}

  getPendingUsers( adminId: string ) {
    return this.http
      .get(appConfig.apiUrl + 'admin/getPendingUsers/' + adminId, this.httpOptions )
      .pipe();
  };

  acceptOrDeclineUser( decision: boolean, userId: string, adminId: string ) {

    let body = {
      userId,
      verified: false
    };
      if ( decision ) {
        body.verified = true;
      }

    return this.http
      .post(appConfig.apiUrl + 'admin/verifyUser/' + adminId , body, this.httpOptions )
      .pipe();

  }

  viewUnverifiedUsers ( adminId: string ) {
    return this.http
      .get(appConfig.apiUrl + 'admin/viewUnverifiedUsers/' + adminId, this.httpOptions )
      .pipe();
  }

  viewDiscussions () {
    return this.http
      .get(appConfig.apiUrl + 'messages/viewAllDiscussions', this.httpOptions)
      .pipe();
  }

  createDiscussion( adminId: string , body ) {
    return this.http
      .post(appConfig.apiUrl + 'messages/createDiscussion/' + adminId , body, this.httpOptions )
      .pipe();
  }

  addContributor ( adminId: string , body ) {
    return this.http
      .post(appConfig.apiUrl + "messages/addContributor/" + adminId , body, this.httpOptions)
      .pipe();
  }

  removeContributor ( adminId: string , body ) {
    return this.http
      .post(appConfig.apiUrl + "messages/removeContributor/" + adminId , body, this.httpOptions)
      .pipe();
  }

  deleteDiscussion( adminId: string , body ) {
    return this.http
      .post(appConfig.apiUrl + "messages/deleteDiscussion/" + adminId , body, this.httpOptions)
      .pipe();
  }

}

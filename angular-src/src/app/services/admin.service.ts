import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

import { appConfig } from "../app.config";

@Injectable()
export class AdminService {

  constructor(private http: Http){}

  getPendingUsers( adminId: string ) {
    return this.http
      .get(appConfig.apiUrl + 'admin/getPendingUsers/' + adminId )
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
      .post(appConfig.apiUrl + 'admin/verifyUser/' + adminId , body )
      .pipe();

  }

  viewUnverifiedUsers ( adminId: string ) {
    return this.http
      .get(appConfig.apiUrl + 'admin/viewUnverifiedUsers/' + adminId )
      .pipe();
  }

  viewDiscussions () {
    return this.http
      .get(appConfig.apiUrl + 'messages/viewAllDiscussions')
      .pipe();
  }

  createDiscussion( adminId: string , body ) {
    return this.http
      .post(appConfig.apiUrl + 'messages/createDiscussion/' + adminId , body )
      .pipe();
  }

  addContributor ( adminId: string , body ) {
    return this.http
      .post(appConfig.apiUrl + "messages/addContributor/" + adminId , body)
      .pipe();
  }

  removeContributor ( adminId: string , body ) {
    return this.http
      .post(appConfig.apiUrl + "messages/removeContributor/" + adminId , body)
      .pipe();
  }

  deleteDiscussion( adminId: string , body ) {
    return this.http
      .post(appConfig.apiUrl + "messages/deleteDiscussion/" + adminId , body)
      .pipe();
  }

}

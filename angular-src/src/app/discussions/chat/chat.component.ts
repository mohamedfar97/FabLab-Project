import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ProjectDiscussionService} from "../../services/project-discussion.service";
import {ActivatedRoute, Params} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../services/admin.service";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit  {

  newMessage;
  room;
  messages = Array<any>();
  user;
  contributors = [];
  contributor: FormGroup;

  constructor(private authService: AuthService,
              private socketService : ProjectDiscussionService,
              private adminService: AdminService,
              private route: ActivatedRoute) {

    this.user = this.authService.getUserFromToken(sessionStorage.getItem('x-auth'));

    this.route.queryParams
      .subscribe((queryParams: Params) => {
        this.room = queryParams['room'];
      });

    this.socketService.getTopMessages(this.room)
      .subscribe((res : any) => {
        this.messages = JSON.parse(res._body).data;
    }, (err) => {
      alert(JSON.parse(err._body).errMsg);
    });

    socketService.socket.emit('joinDiscussion', {
      room: this.room,
      userId: this.user._id,
      userUsername: this.user.username,
      userName: this.user.name
    });
  }

  ngOnInit() {

    this.contributor = new FormGroup({
      username: new FormControl('',Validators.required),
    });

    this.socketService.socket.on('discussionMessage', (message) => {
      this.messages.push(message);
    });

    this.socketService.socket
      .on('errorMessage', (errorBody) => {
        alert(errorBody.errMsg);
        console.log(errorBody.err);
      });

    this.socketService.socket
      .on('updateContributors', (contributors) => {
        this.contributors = contributors.contributors;
        console.log(this.contributors);
      })
  }

  onRemoveContributor( username ) {

    let body = {
      username,
      disc: this.room
    }

    this.adminService.removeContributor(this.user._id, body)
    .subscribe((res:any) => {
      console.log(JSON.parse(res._body));
    }, (err) => {
      console.log("Cannot Remove Contributor");
      alert(JSON.parse(err._body).errMsg);
    })
  }

  onAddContributor( {value, valid}: { value: Contributor, valid: boolean } ) {
    if(valid) {
      let body = {
        username: value.username,
        disc: this.room
      };

      console.log(this.user._id);
      console.log(JSON.stringify(body));

      this.adminService.addContributor(this.user._id, body)
        .subscribe((res:any) => {
          console.log(res);
        }, (err) => {
          alert(JSON.parse(err._body).errMsg);
        })
    } else {
      console.log("Invalid Inputs");
    }
  }

  isFullAdmin() {
    return (this.user.adminAccess === "full");
  }

  send() {
    this.socketService.socket.emit('discussionMessage', {
      sender: this.user.username,
      discussion: this.room,
      message: this.newMessage,
      messageDate: new Date()
    });
    this.newMessage = "";
  }

  enterSend(event) {
    if (event.keyCode === 13) {
      document.getElementById("send").click();
    }
  }
}

export interface Contributor {
  username: string;
}

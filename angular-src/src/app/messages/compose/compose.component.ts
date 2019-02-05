import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {MessagingService} from "../../services/messaging.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {
  message:FormGroup;


  public editorOptions = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean'],                                         // remove formatting button

        ['link', 'image', 'video']                         // link and image, video
      ]
  };

  constructor(private messagingService: MessagingService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {

    this.message = new FormGroup({
      to: new FormControl('', [Validators.required]),
      subject: new FormControl(''),
      content: new FormControl('', Validators.required)
    });
  }

  onSend({value, valid}: { value: Message, valid: boolean }){

    if( valid ){
      let currentUser = this.authService.getUserFromToken(sessionStorage.getItem('x-auth'));
      let body = {
        sender: currentUser.username,
        receiver: value.to,
        subject: value.subject,
        message: value.content
      };

      this.messagingService.sendMessage(body)
        .subscribe( (res:any) => {
          console.log(JSON.parse(res._body).msg);
          this.router.navigate(['/messages/sentbox'])
        } , (err) => {
          alert(JSON.parse(err._body).errMsg);
        })
    } else {
      alert("Please Fill All Required Fields Correctly");
    }
  }
}

export interface Message {
  to: string;
  subject: string;
  content: string;
}

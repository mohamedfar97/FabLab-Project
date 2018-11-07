import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/signup/signup.component";

@Component({
  selector: 'app-client-reg',
  templateUrl: './client-reg.component.html',
  styleUrls: ['./client-reg.component.css']
})
export class ClientRegComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit({value, valid}: { value: User, valid: boolean }){

  }

}

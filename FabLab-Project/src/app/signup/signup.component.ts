import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('firstNameInput') nameInput: ElementRef;
  @ViewChild('roleInput') roleInput: ElementRef;
  @ViewChild('emailInput') emailInput: ElementRef;
  @ViewChild('passwordInput') passwordInput: ElementRef;
  @ViewChild('confirmedPasswordInput') confirmPasswordInput: ElementRef;
  @ViewChild('phoneInput') phoneInput: ElementRef;
  @ViewChild('maleInput') maleInput: ElementRef;
  @ViewChild('femaleInput') femaleInput: ElementRef;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignUp() {
    const name = this.nameInput.nativeElement.value;
    const email = this.emailInput.nativeElement.value;
    const password = this.passwordInput.nativeElement.value;
    const confirmPassword = this.confirmPasswordInput.nativeElement.value;
    const role = this.roleInput.nativeElement.value;
    const phone = this.phoneInput.nativeElement.value;

    var gender;
    if ( this.maleInput.nativeElement.checked ) {
      gender = "male";
    } else if ( this.femaleInput.nativeElement.checked ) {
      gender = "female";
    }

    if ( confirmPassword === password ) {
      this.authService.signUp(name, email, password, role, phone,gender)
        .subscribe((res) => console.log(res),
          (error) => console.log(error));
    } else{
      console.log("Mismatched Passwords");
    }
  }


}

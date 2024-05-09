import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { Iuser } from '../models/iuser';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  email: string;
  givenName: string;
  nickname: string;
  password: string;

  constructor(
    private authService: AuthService
  ) {

  }

  onRegister(): void {
    this.authService.register(this.email, this.givenName, this.nickname, this.password);
  }
}

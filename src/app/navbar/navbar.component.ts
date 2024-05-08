import { Component, OnInit } from '@angular/core';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit{

  isLoggedIn: Observable<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
      this.isLoggedIn = this.authService.isLoggedIn;
  }

  onLogout(): void {
    this.authService.logout();
  }
}

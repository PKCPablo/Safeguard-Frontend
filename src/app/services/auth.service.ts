import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Iuser } from '../models/iuser';

const ACCESS_TOKEN = 'IdToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  poolData = {
    UserPoolId: environment.cognito.userPoolId,
    ClientId: environment.cognito.clientId,
  };

  userPool = new CognitoUserPool(this.poolData);

  constructor(private router: Router) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(email: string, password: string) {
    var userData = {
      Username: email,
      Pool: this.userPool,
    };

    var cognitoUser = new CognitoUser(userData);

    var authData = {
      Username: email,
      Password: password,
    };

    var authDetails = new AuthenticationDetails(authData);

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        this.loggedIn.next(true);
        localStorage.setItem("idToken", result.getIdToken().getJwtToken());
        this.router.navigate(['/home']);
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err));
      },
    });
  }

  logout(): void {
    var currentUser = this.userPool.getCurrentUser();
    currentUser.signOut();

    this.loggedIn.next(false);
    localStorage.removeItem("idToken");

    this.router.navigate(['']);
  }

  register(email: string, givenName: string, nickname: string, password: string): void {
    var attrList = [];
    var iuser: Iuser = {
      email: email,
      given_name: givenName,
      nickname: nickname
    }

    for(let key in iuser) {
      var attrData = {
        Name: key,
        Value: iuser[key]
      }
      var attr = new CognitoUserAttribute(attrData);
      attrList.push(attr);
    }

    this.userPool.signUp(email, password, attrList, [], (err, result) => {
      if(err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      var newUser = result.user;
      console.log(JSON.stringify(newUser));
      alert("Te hemos enviado un correo para activar tu cuenta.");
    });
    this.router.navigate(['/login']);
  }

  getToken(): string {
    return localStorage.getItem("idToken");
  }
}

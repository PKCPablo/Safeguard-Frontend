import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  poolData = {
    UserPoolId: environment.UserPoolId,
    ClientId: environment.ClientId,
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
        this.router.navigate(['/home']);
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err));
      },
    });
  }

  logout() {
    var currentUser = this.userPool.getCurrentUser();
    currentUser.signOut();
    this.loggedIn.next(false);
    this.router.navigate(['']);
  }
}

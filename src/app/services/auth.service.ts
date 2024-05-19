import { Injectable } from '@angular/core';
import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Iuser } from '../models/iuser';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private loggedIn: boolean;
    private currentUser: CognitoUser;

    poolData = {
        UserPoolId: environment.cognito.userPoolId,
        ClientId: environment.cognito.clientId,
    };

    userPool = new CognitoUserPool(this.poolData);

    constructor(private router: Router) {
        if (localStorage.getItem('idToken')) {
            this.loggedIn = true;
        } else {
            this.loggedIn = false;
        }

        this.currentUser = null;
    }

    get isAuth() {
        return this.loggedIn;
    }

    get authUser() {
        return this.currentUser;
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
                this.loggedIn = true;
                localStorage.setItem(
                    'idToken',
                    result.getIdToken().getJwtToken()
                );
                this.loadCurrentUser();
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

        this.loggedIn = false;
        this.currentUser = null;
        localStorage.removeItem('idToken');

        this.router.navigate(['']);
    }

    signup(
        email: string,
        givenName: string,
        nickname: string,
        password: string
    ): void {
        var attrList = [];
        var iuser: Iuser = {
            email: email,
            given_name: givenName,
            nickname: nickname,
        };

        for (let key in iuser) {
            var attrData = {
                Name: key,
                Value: iuser[key],
            };
            var attr = new CognitoUserAttribute(attrData);
            attrList.push(attr);
        }

        this.userPool.signUp(email, password, attrList, [], (err, result) => {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            var newUser = result.user;
            console.log(JSON.stringify(newUser));
            alert('Te hemos enviado un correo para activar tu cuenta.');
        });
        this.router.navigate(['/login']);
    }

    getJwtIdToken(): string {
        return localStorage.getItem('idToken');
    }

    loadCurrentUser(): void {
        if (this.currentUser != null) return;

        this.userPool.getCurrentUser().getSession((err: any, session: any) => {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            this.currentUser = this.userPool.getCurrentUser();
        });
    }
}

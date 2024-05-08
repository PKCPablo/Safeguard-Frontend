import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { Iuser } from '../models/iuser';
import { Router } from '@angular/router';

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
    private router: Router
  ) {

  }

  onRegister(): void {
    var poolData = {
      UserPoolId: environment.UserPoolId,
      ClientId: environment.ClientId,
    };

    var userPool = new CognitoUserPool(poolData);

    var attrList = [];
    var iuser: Iuser = {
      email: this.email,
      given_name: this.givenName,
      nickname: this.nickname
    }

    for(let key in iuser) {
      var attrData = {
        Name: key,
        Value: iuser[key]
      }
      var attr = new CognitoUserAttribute(attrData);
      attrList.push(attr);
    }

    userPool.signUp(this.email, this.password, attrList, [], (err, result) => {
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
}

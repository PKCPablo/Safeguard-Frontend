import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit {

  attributes: CognitoUserAttribute[];
  poolData = {
    UserPoolId: environment.cognito.userPoolId,
    ClientId: environment.cognito.clientId,
  };

  ngOnInit(): void {
    var userPool = new CognitoUserPool(this.poolData);
    var currentUser = userPool.getCurrentUser();
    currentUser.getSession((err: any, session: any) => {
      if(err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      currentUser.getUserAttributes((err, result) => {
        if(err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        this.attributes = result;
      });
    });
  }

}

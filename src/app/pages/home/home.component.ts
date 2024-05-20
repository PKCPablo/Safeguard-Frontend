import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
    name: String;
    attributes: CognitoUserAttribute[];

    isDataLoaded$: boolean;

    constructor(private authService: AuthService) {
        this.isDataLoaded$ = false;
    }

    ngOnInit(): void {
        var currentUser = this.authService.authUser;

        currentUser.getSession((err: any, session: any) => {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            currentUser.getUserAttributes((err, result) => {
                if (err) {
                    alert(err.message || JSON.stringify(err));
                    return;
                }
                this.attributes = result;

                this.name = this.attributes.filter((att) => {
                    return att.getName().includes('given_name');
                })[0].Value;

                this.isDataLoaded$ = true;
            });
        });
    }

    onLoad() {
        this.authService.authUser.getUserAttributes((err, result) => {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            this.attributes = result;
        });

        this.name = '';

        this.name = this.attributes.filter((att) => {
            return att.getName().includes('given_name');
        })[0].Value;
    }
}

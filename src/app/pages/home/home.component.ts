import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { Subscription } from 'rxjs';
import { AccountService } from '../../services/account.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
    name: String;
    username: string;
    attributes: CognitoUserAttribute[];

    isDataLoaded$: boolean;

    constructor(private authService: AuthService, private accountService: AccountService) {
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

                this.username = currentUser.getUsername();

                this.accountService.retrieveAccountByUserId(this.username).subscribe({
                    next: (result) => {
                        this.isDataLoaded$ = true;
                    },
                    error: (error) => {
                        this.createNewAccount();
                    },
                });
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

    createNewAccount() {
        let obj: any = {};

        obj['userId'] = this.username;
        obj['balance'] = 0;
        obj['paymentsIds'] = [];

        this.accountService.createAccount(obj).subscribe({
            next: (result) => {
                this.isDataLoaded$ = true;
            },
            error: (error) => {
                console.log(error);
            },
        });
    }
}

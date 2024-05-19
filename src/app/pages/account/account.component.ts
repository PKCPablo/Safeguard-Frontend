import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { RetrieveAccountResponse } from '../../templates/account/retrieve-account-response';
import { AuthService } from '../../services/auth.service';
import { CreateAccountRequest } from '../../templates/account/create-account-request';
import { Observable, Observer, Subscription } from 'rxjs';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit {
    constructor(private accountService: AccountService, private authService: AuthService) {}

    account: RetrieveAccountResponse;
    username: string;

    isDataLoaded$: Subscription;

    ngOnInit(): void {
        this.username = this.authService.authUser.getUsername();

        this.isDataLoaded$ = this.accountService.retrieveAccountByUserId(this.username).subscribe({
            next: (data) => {
                this.account = data;
            },
            error: (error) => {
                this.createNewAccount();
            },
        });
    }

    createNewAccount() {
        let obj: any = {};

        obj['userId'] = this.username;
        obj['balance'] = 0;
        obj['paymentsIds'] = [''];

        console.log(obj);

        this.accountService.writeAccount(obj).subscribe({
            next: (data) => {
                console.log(data);
                this.account = data;
            },
            error: (error) => {
                console.log(error);
            },
        });
    }
}
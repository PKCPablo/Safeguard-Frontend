import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { RetrieveAccountResponse } from '../../templates/account/retrieve-account-response';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrl: './account.component.css',
})
export class AccountComponent {
    account: RetrieveAccountResponse;

    constructor(private accountService: AccountService, private authService: AuthService) {
        accountService.retrieveAccount('0').subscribe((data) => {
            this.account = data;
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { RetrieveAccountResponse } from '../../templates/account/retrieve-account-response';
import { AuthService } from '../../services/auth.service';
import { CreateAccountRequest } from '../../templates/account/create-account-request';
import { Observable, Observer, Subscription } from 'rxjs';
import { RetrievePaymentResponse } from '../../templates/payment/retrieve-payment-response';
import { PaymentService } from '../../services/payment.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit {
    constructor(
        private accountService: AccountService,
        private authService: AuthService,
        private paymentService: PaymentService
    ) {}

    account: RetrieveAccountResponse;
    username: string;

    isDataLoaded$: Subscription;

    paymentsList: RetrievePaymentResponse[];

    ngOnInit(): void {
        this.username = this.authService.authUser.getUsername();

        this.isDataLoaded$ = this.accountService.retrieveAccountByUserId(this.username).subscribe({
            next: (data) => {
                this.account = data;
                if (this.account.paymentsIds.length == 0) {
                    return;
                }

                this.paymentService.retrievePayments().subscribe({
                    next: (result) => {
                        this.paymentsList = result.payments.filter((payment) => {
                            return this.account.paymentsIds.includes(payment.id);
                        });
                    },
                    error: (error) => {
                        this.authService.openDialog(error);
                    },
                });
            },
            error: (error) => {
                console.log(error);
            },
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { ApiRestService } from '../../services/api-rest.service';
import { Product } from '../../models/product';
import { AuthService } from '../../services/auth.service';
import { AccountService } from '../../services/account.service';
import { PaymentService } from '../../services/payment.service';
import { PaymentHistoryService } from '../../services/payment-history.service';
import { RetrieveAccountResponse } from '../../templates/account/retrieve-account-response';
import { RetrievePaymentResponse } from '../../templates/payment/retrieve-payment-response';
import { RetrievePaymentHistoryResponse } from '../../templates/paymentHistory/retrieve-payment-history-response';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
    productos: Product[];
    accounts: RetrieveAccountResponse[];
    payments: RetrievePaymentResponse[];
    paymentHistories: RetrievePaymentHistoryResponse[];

    username: String;

    constructor(
        private apiRestService: ApiRestService,
        private authService: AuthService,
        private accountService: AccountService,
        private paymentService: PaymentService,
        private paymentHistoryService: PaymentHistoryService
    ) {}

    ngOnInit(): void {
        this.onLoad();
        this.username = this.authService.authUser.getUsername();
    }

    onLoad() {
        this.apiRestService.retrieveProducts().subscribe((data) => {
            this.productos = data;
        });
        this.accountService.retrieveAccounts().subscribe((data) => {
            this.accounts = data.accounts;
        });
        this.paymentService.retrievePayments().subscribe((data) => {
            this.payments = data.payments;
        });
        this.paymentHistoryService.retrievePaymentHistories().subscribe((data) => {
            this.paymentHistories = data.paymentHistories;
        });
    }
}

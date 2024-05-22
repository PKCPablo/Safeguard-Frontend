import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { RetrieveAccountsResponse } from '../../templates/account/retrieve-accounts-response';
import { RetrieveAccountResponse } from '../../templates/account/retrieve-account-response';
import { map, Observable, startWith } from 'rxjs';
import { PaymentService } from '../../services/payment.service';
import { RetrievePaymentResponse } from '../../templates/payment/retrieve-payment-response';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {
    paymentFormFirstStep = new FormControl<string | RetrieveAccountResponse>('');
    paymentFormSecondStep = new FormControl<number>(0);

    accountList: RetrieveAccountResponse[];
    options: RetrieveAccountResponse[];
    filteredOptions: Observable<RetrieveAccountResponse[]>;

    acceptedPayment: boolean;

    userAccount: RetrieveAccountResponse;
    selectedAccount: RetrieveAccountResponse = { id: '', userId: '', balance: 0, paymentsIds: [] };
    paymentDone: RetrievePaymentResponse;

    maxPaymentAmount: number = 1;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private accountService: AccountService,
        private paymentService: PaymentService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.accountService.retrieveAccounts().subscribe({
            next: (result) => {
                this.accountList = result.accounts;

                var username = this.authService.authUser.getUsername();

                this.accountList = this.accountList.filter((account) => {
                    if (account.userId.includes(username)) {
                        this.userAccount = account;
                        this.maxPaymentAmount = account.balance;
                        return false;
                    }

                    return true;
                });

                this.options = this.accountList;

                this.onLoad();

                this.paymentFormFirstStep.addValidators([
                    Validators.minLength(1),
                    Validators.required,
                ]);
                this.paymentFormSecondStep.addValidators([
                    Validators.required,
                    Validators.max(this.maxPaymentAmount),
                    Validators.min(1),
                ]);
            },
            error: (error) => {
                this.authService.openDialog(error);
            },
        });

        this.acceptedPayment = false;
    }

    onLoad() {
        this.filteredOptions = this.paymentFormFirstStep.valueChanges.pipe(
            startWith(''),
            map((value) => {
                const name = typeof value === 'string' ? value : value?.userId;
                return name ? this._filter(name as string) : this.options.slice();
            })
        );
    }

    displayFn(account: RetrieveAccountResponse): string {
        return account && account.userId ? account.userId : '';
    }

    private _filter(value: string): RetrieveAccountResponse[] {
        const filterValue = value.toLowerCase();

        return this.accountList.filter((option) =>
            option.userId.toLowerCase().includes(filterValue)
        );
    }

    redirectToHome() {
        this.acceptedPayment = true;
        this.makePayment();
    }

    loadAccount() {
        this.selectedAccount = this.paymentFormFirstStep.value as RetrieveAccountResponse;
    }

    makePayment(): void {
        var amountToPay = this.paymentFormSecondStep.value as number;

        let obj: any = {};

        obj['accountFromId'] = this.userAccount.id;
        obj['accountToId'] = this.selectedAccount.id;
        obj['amount'] = amountToPay;

        this.paymentService.writePayment(obj).subscribe({
            next: (data) => {
                if (this.userAccount.paymentsIds == null) {
                    this.userAccount.paymentsIds = [];
                }

                this.userAccount.paymentsIds.push(data.id);

                this.userAccount.balance = this.userAccount.balance - amountToPay;
                this.selectedAccount.balance = this.selectedAccount.balance + amountToPay;

                this.updateAccount(this.userAccount).subscribe({
                    next: (result) => {
                        console.log('User Account: ' + result.userId + ' ' + result.balance);
                        this.updateAccount(this.selectedAccount).subscribe({
                            next: (res) => {
                                console.log('Selected Account: ' + res.userId + ' ' + res.balance);
                                this.router.navigate(['/home']);
                            },
                            error: (error) => {
                                this.authService.openDialog(error);
                                this.router.navigate(['/home']);
                            },
                        });
                    },
                    error: (error) => {
                        this.authService.openDialog(error);
                        this.router.navigate(['/home']);
                    },
                });
            },
            error: (error) => {
                console.log(error);
            },
        });
    }

    updateAccount(account: RetrieveAccountResponse): Observable<RetrieveAccountResponse> {
        let obj: any = {};

        obj['userId'] = account.userId;
        obj['balance'] = account.balance;
        obj['paymentsIds'] = account.paymentsIds;

        return this.accountService.updateAccount(obj, account.id);
    }
}

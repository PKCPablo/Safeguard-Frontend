import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { RetrieveAccountsResponse } from '../../templates/account/retrieve-accounts-response';
import { RetrieveAccountResponse } from '../../templates/account/retrieve-account-response';
import { map, Observable, startWith } from 'rxjs';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {
    paymentFormFirstStep = new FormControl('');

    paymentFormSecondStep = this.formBuilder.group({
        amount: ['', Validators.required],
    });

    accountList: RetrieveAccountResponse[];
    options: string[];
    filteredOptions: Observable<string[]>;

    acceptedPayment: boolean;

    constructor(private formBuilder: FormBuilder, private accountService: AccountService) {}

    ngOnInit(): void {
        this.accountService.retrieveAccounts().subscribe((result) => {
            this.accountList = result.accounts;

            this.options = this.accountList.map((account) => {
                return account.userId;
            });

            this.onLoad();
        });

        this.paymentFormFirstStep.addValidators([Validators.minLength(1), Validators.required]);

        this.acceptedPayment = false;
    }

    onLoad() {
        this.filteredOptions = this.paymentFormFirstStep.valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value || ''))
        );
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter((option) => option.toLowerCase().includes(filterValue));
    }

    redirectToHome() {
        this.acceptedPayment = true;
        setTimeout(function () {
            window.location.replace('/home');
        }, 4000);
    }
}

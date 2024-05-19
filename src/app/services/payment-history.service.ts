import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PaymentHistory } from '../models/payment-history';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PaymentHistoryService {
    APIURL = environment.api.APIURL;

    constructor(private httpClient: HttpClient) {}

    // @RequestMapping(path = "/paymentHistory/{id}", method = RequestMethod.GET)
    public retrievePaymentHistory(id: string): Observable<PaymentHistory> {
        return this.httpClient.get<PaymentHistory>(
            `${this.APIURL}/paymentHistory/${id}`
        );
    }

    // @RequestMapping(path = "/paymentHistory", method = RequestMethod.GET)
    public retrievePaymentHistories(): Observable<PaymentHistory[]> {
        return this.httpClient.get<PaymentHistory[]>(
            `${this.APIURL}/paymentHistory`
        );
    }

    // @RequestMapping(path = "/paymentHistory", method = RequestMethod.POST)
    public writePaymentHistory(
        paymentHistory: PaymentHistory
    ): Observable<PaymentHistory> {
        return this.httpClient.post<PaymentHistory>(
            `${this.APIURL}/paymentHistory`,
            paymentHistory
        );
    }

    // @RequestMapping(path = "/paymentHistory/{id}", method = RequestMethod.DELETE)
    public deletePaymentHistory(id: string): Observable<void> {
        return this.httpClient.delete<void>(
            `${this.APIURL}/paymentHistory/${id}`
        );
    }
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PaymentHistory } from '../models/payment-history';
import { Observable } from 'rxjs';
import { RetrievePaymentHistoryResponse } from '../templates/paymentHistory/retrieve-payment-history-response';
import { RetrievePaymentHistoriesResponse } from '../templates/paymentHistory/retrieve-payment-histories-response';
import { CreatePaymentHistoryRequest } from '../templates/paymentHistory/create-payment-history-request';

@Injectable({
    providedIn: 'root',
})
export class PaymentHistoryService {
    APIURL = environment.api.APIURL;

    constructor(private httpClient: HttpClient) {}

    // @RequestMapping(path = "/paymentHistory/{id}", method = RequestMethod.GET)
    public retrievePaymentHistory(id: string): Observable<RetrievePaymentHistoryResponse> {
        return this.httpClient.get<RetrievePaymentHistoryResponse>(
            `${this.APIURL}/paymentHistory/${id}`
        );
    }

    // @RequestMapping(path = "/paymentHistory", method = RequestMethod.GET)
    public retrievePaymentHistories(): Observable<RetrievePaymentHistoriesResponse> {
        return this.httpClient.get<RetrievePaymentHistoriesResponse>(
            `${this.APIURL}/paymentHistory`
        );
    }

    // @RequestMapping(path = "/paymentHistory", method = RequestMethod.POST)
    public writePaymentHistory(request: CreatePaymentHistoryRequest): Observable<void> {
        return this.httpClient.post<void>(`${this.APIURL}/paymentHistory`, request);
    }

    // @RequestMapping(path = "/paymentHistory/{id}", method = RequestMethod.DELETE)
    public deletePaymentHistory(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.APIURL}/paymentHistory/${id}`);
    }
}

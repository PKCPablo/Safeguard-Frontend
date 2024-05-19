import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Payment } from '../models/payment';
import { Observable } from 'rxjs';
import { RetrievePaymentResponse } from '../templates/payment/retrieve-payment-response';
import { RetrievePaymentsResponse } from '../templates/payment/retrieve-payments-response';
import { CreatePaymentRequest } from '../templates/payment/create-payment-request';

@Injectable({
    providedIn: 'root',
})
export class PaymentService {
    APIURL = environment.api.APIURL;

    constructor(private httpClient: HttpClient) {}

    // @RequestMapping(path = "/payment/{id}", method = RequestMethod.GET)
    public retrievePayment(id: string): Observable<RetrievePaymentResponse> {
        return this.httpClient.get<RetrievePaymentResponse>(`${this.APIURL}/payment/${id}`);
    }

    // @RequestMapping(path = "/payment", method = RequestMethod.GET)
    public retrievePayments(): Observable<RetrievePaymentsResponse> {
        return this.httpClient.get<RetrievePaymentsResponse>(`${this.APIURL}/payment`);
    }

    // @RequestMapping(path = "/payment", method = RequestMethod.POST)
    public writePayment(request: CreatePaymentRequest): Observable<void> {
        return this.httpClient.post<void>(`${this.APIURL}/payment`, request);
    }

    // @RequestMapping(path = "/payment/{id}", method = RequestMethod.DELETE)
    public deletePayment(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.APIURL}/payment/${id}`);
    }
}

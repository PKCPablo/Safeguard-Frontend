import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Payment } from '../models/payment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PaymentService {
    APIURL = environment.api.APIURL;

    constructor(private httpClient: HttpClient) {}

    // @RequestMapping(path = "/payment/{id}", method = RequestMethod.GET)
    public retrievePayment(id: string): Observable<Payment> {
        return this.httpClient.get<Payment>(`${this.APIURL}/payment/${id}`);
    }

    // @RequestMapping(path = "/payment", method = RequestMethod.GET)
    public retrievePayments(): Observable<Payment[]> {
        return this.httpClient.get<Payment[]>(`${this.APIURL}/payment`);
    }

    // @RequestMapping(path = "/payment", method = RequestMethod.POST)
    public writePayment(payment: Payment): Observable<Payment> {
        return this.httpClient.post<Payment>(`${this.APIURL}/payment`, payment);
    }

    // @RequestMapping(path = "/payment/{id}", method = RequestMethod.DELETE)
    public deletePayment(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.APIURL}/payment/${id}`);
    }
}

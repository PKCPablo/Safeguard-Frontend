import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Payment } from '../models/payment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  APIURL = environment.api.APIURL;

  constructor(private httpClient: HttpClient) { }

  public getPaymentById(id: string): Observable<Payment> {
    return this.httpClient.get<Payment>(this.APIURL + '/payment/' + id);
  }

  public getProductoList(): Observable<Payment[]> {
    return this.httpClient.get<Payment[]>(this.APIURL + '/payment');
  }
}

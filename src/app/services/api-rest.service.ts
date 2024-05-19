import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root',
})
export class ApiRestService {
    APIURL = environment.api.APIURL;

    constructor(private httpClient: HttpClient) {}

    public retrieveProduct(id: string): Observable<Product> {
        return this.httpClient.get<Product>(`${this.APIURL}/product/${id}`);
    }

    public retrieveProducts(): Observable<Product[]> {
        return this.httpClient.get<Product[]>(`${this.APIURL}/product`);
    }

    public writeProduct(product: Product): Observable<Product> {
        return this.httpClient.post<Product>(`${this.APIURL}/product`, product);
    }

    public deleteProduct(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.APIURL}/product/${id}`);
    }
}

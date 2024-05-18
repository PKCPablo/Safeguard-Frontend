import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
    providedIn: 'root',
})
export class ApiRestService {
    APIURL = environment.api.APIURL;

    constructor(private httpClient: HttpClient) {}

    public retrieveProduct(id: string): Observable<Producto> {
        return this.httpClient.get<Producto>(`${this.APIURL}/product/${id}`);
    }

    public retrieveProducts(): Observable<Producto[]> {
        return this.httpClient.get<Producto[]>(`${this.APIURL}/product`);
    }

    public createProduct(data: {}): Observable<Producto> {
        return this.httpClient.post<Producto>(`${this.APIURL}/product`, data)
    }

    public updateProduct(id:string, data: {}): Observable<Producto> {
        return this.httpClient.put<Producto>(`${this.APIURL}/product/${id}`, data)
    }
}

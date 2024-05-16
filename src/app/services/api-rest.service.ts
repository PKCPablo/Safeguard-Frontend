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

    public getProductoById(id: string): Observable<Producto> {
        return this.httpClient.get<Producto>(this.APIURL + '/producto/' + id);
    }

    public getProductoList(): Observable<Producto[]> {
        return this.httpClient.get<Producto[]>(this.APIURL + '/producto/');
    }
}

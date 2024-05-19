import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account';

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    APIURL = environment.api.APIURL;

    constructor(private httpClient: HttpClient) {}

    // @RequestMapping(path = "/account/{id}", method = RequestMethod.GET)
    public retrieveAccount(id: string): Observable<Account> {
        return this.httpClient.get<Account>(`${this.APIURL}/account/${id}`);
    }

    // @RequestMapping(path = "/account", method = RequestMethod.GET)
    public retrieveAccounts(): Observable<Account[]> {
        return this.httpClient.get<Account[]>(`${this.APIURL}/account`);
    }

    // @RequestMapping(path = "/account", method = RequestMethod.POST)
    public writeAccount(account: Account): Observable<Account> {
        return this.httpClient.post<Account>(`${this.APIURL}/account`, account);
    }

    // @RequestMapping(path = "/account/{id}", method = RequestMethod.DELETE)
    public deleteAccount(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.APIURL}/account/${id}`);
    }
}

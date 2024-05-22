import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RetrieveAccountResponse } from '../templates/account/retrieve-account-response';
import { RetrieveAccountsResponse } from '../templates/account/retrieve-accounts-response';
import { CreateAccountRequest } from '../templates/account/create-account-request';

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    private APIURL = environment.api.APIURL;

    constructor(private httpClient: HttpClient) {}

    // @RequestMapping(path = "/account/{id}", method = RequestMethod.GET)
    public retrieveAccount(id: string): Observable<RetrieveAccountResponse> {
        return this.httpClient.get<RetrieveAccountResponse>(`${this.APIURL}/account/${id}`);
    }

    // @RequestMapping(path = "/account/accountByUserId/{userId}")
    public retrieveAccountByUserId(userId: string): Observable<RetrieveAccountResponse> {
        return this.httpClient.get<RetrieveAccountResponse>(
            `${this.APIURL}/account/accountByUserId/${userId}`
        );
    }

    // @RequestMapping(path = "/account", method = RequestMethod.GET)
    public retrieveAccounts(): Observable<RetrieveAccountsResponse> {
        return this.httpClient.get<RetrieveAccountsResponse>(`${this.APIURL}/account`);
    }

    // @RequestMapping(path = "/account", method = RequestMethod.POST)
    public createAccount(request: {}): Observable<RetrieveAccountResponse> {
        return this.httpClient.post<RetrieveAccountResponse>(`${this.APIURL}/account`, request);
    }

    // @RequestMapping(path = "/account/{id}", method = RequestMethod.PUT)
    public updateAccount(request: {}, id: string): Observable<RetrieveAccountResponse> {
        return this.httpClient.put<RetrieveAccountResponse>(
            `${this.APIURL}/account/${id}`,
            request
        );
    }

    // @RequestMapping(path = "/account/{id}", method = RequestMethod.DELETE)
    public deleteAccount(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.APIURL}/account/${id}`);
    }

    // @
}

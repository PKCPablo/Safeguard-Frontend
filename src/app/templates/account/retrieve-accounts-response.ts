import { RetrieveAccountResponse } from './retrieve-account-response';

export interface RetrieveAccountsResponse {
    accounts: RetrieveAccountResponse[];
    numOfResults: number;
}

import { RetrievePaymentHistoryResponse } from './retrieve-payment-history-response';

export interface RetrievePaymentHistoriesResponse {
    paymentHistories: RetrievePaymentHistoryResponse[];
    numOfResults: number;
}

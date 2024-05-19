import { RetrievePaymentResponse } from './retrieve-payment-response';

export interface RetrievePaymentsResponse {
    payments: RetrievePaymentResponse[];
    numOfResults: number;
}

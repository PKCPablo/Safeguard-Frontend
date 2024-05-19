export interface CreatePaymentRequest {
    id: string;
    accountFromId: string;
    accountToId: string;
    amount: number;
}

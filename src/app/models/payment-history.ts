export class PaymentHistory {
    id: string;
    userId: string;
    paymentsId: string[];

    constructor(id: string, userId: string, paymentsId: string[]) {
        this.id = id;
        this.userId = userId;
        this.paymentsId = paymentsId;
    }
}

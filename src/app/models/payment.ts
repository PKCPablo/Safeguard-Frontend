export class Payment {
    id: string;
    accountFromId: string;
    accountToId: string;
    amount: number;

    constructor(id: string, accountFromId: string, accountToId: string, amount: number) {
        this.id = id;
        this.accountFromId = accountFromId;
        this.accountToId = accountToId;
        this.amount = amount;
    }
}

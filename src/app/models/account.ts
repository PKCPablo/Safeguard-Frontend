export class Account {
    id: string;
    userId: string;
    balance: number;

    constructor(id: string, userId: string, balance: number) {
        this.id = id;
        this.userId = userId;
        this.balance = balance;
    }
}

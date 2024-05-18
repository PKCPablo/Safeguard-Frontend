export class Account {
    id: number;
    userId: string;
    balance: number;

    constructor(id: number, userId: string, balance: number) {
        this.id = id;
        this.userId = userId;
        this.balance = balance;
    }
}

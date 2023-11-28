interface Transfer {
    id: number;
    value: number;
    createdAt: Date;
    senderUserId: number;
    receiverUserId: number;
}

interface Deposit {
    id: number;
    user: number;
    value: number;
    createdAt: Date;
}

export default interface UserWithStatement {
    id: number;
    userName: string;
    balance: number;
    sentTransfers: Transfer[];
    receivedTransfers: Transfer[];
    deposits: Deposit[];
}
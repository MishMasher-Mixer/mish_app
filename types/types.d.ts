export interface Network {
    network: string,
    name: string
}

export interface Token {
    symbol: string,
    name: string,
    network: string,
    minAmount: number,
    fixedOptions: number[]
}

export type Row = {
    value: number;
    token: string;
    time: string;
};

export type OrderEventPayload = {
    orderIds: any[]
    [key: string]: any  // allow any other fields
}

export type Deposit = {
    _id: string 
    publicKey?: string | null 
    withdrawkey: string
    token: string,
    network: string
    amount: number
    type: "fixed" | "any"
    status: "pending" | "confirmed" | "completed" | "failed" | "expired"
    depositAddress: string
    withdrawStatus: "not-available" | "in-request" | "sent" | "cancelled"
    timestamp: number
    createdAt?: Date
    updatedAt?: Date
}
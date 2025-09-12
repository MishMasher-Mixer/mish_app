import { Token } from "@/types/types";

export const tokens: Token[] = [
    {
        symbol: "BTC",
        name: "Bitcoin",
        network: "BTC",
        minAmount: 0.01,
        fixedOptions: [0.01, 0.1, 1]
    },
    {
        symbol: "TRX",
        name: "Tron",
        network: "TRX",
        minAmount: 10000,
        fixedOptions: [10000, 100000, 1000000]
    },
    {
        symbol: "ETH",
        name: "Ethereum",
        network: "ETH",
        minAmount: 1,
        fixedOptions: [1, 10, 100]
    },
    {
        symbol: "SOL",
        name: "Solana",
        network: "SOL",
        minAmount: 5,
        fixedOptions: [5, 50, 100]
    }
]

export const stablecoins: Token[] = [
    {
        symbol: "USDT",
        name: "USDT",
        network: "TRX",
        minAmount: 500,
        fixedOptions: [1000, 10000, 100000]
    },
    {
        symbol: "USDT",
        name: "USDT",
        network: "ETH",
        minAmount: 500,
        fixedOptions: [1000, 10000, 100000]
    },
    {
        symbol: "USDT",
        name: "USDT",
        network: "SOL",
        minAmount: 500,
        fixedOptions: [1000, 10000, 100000]
    },
    {
        symbol: "USDC",
        name: "USDC",
        network: "ETH",
        minAmount: 500,
        fixedOptions: [1000, 10000, 100000]
    },
    {
        symbol: "USDC",
        name: "USDC",
        network: "SOL",
        minAmount: 500,
        fixedOptions: [1000, 10000, 100000]
    },
    {
        symbol: "DAI",
        name: "DAI",
        network: "ETH",
        minAmount: 500,
        fixedOptions: [1000, 10000, 100000]
    }
]
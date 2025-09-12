export function validateAddress(network: string, address: string): boolean {
    switch (network.toUpperCase()) {
        case "BTC":
            // Bitcoin: legacy (1), P2SH (3), bech32 (bc1)
            return /^(1|3|bc1)[a-zA-HJ-NP-Z0-9]{25,39}$/.test(address);

        case "ETH":
        case "ARB":
        case "BASE":
        case "OP":
        case "MATIC":
        case "STARKS":
        case "SCR":
        case "ZRC":
        case "LINEA":
        case "PEPE":
        case "SHIB":
        case "ENA":
        case "BSC":
            // Ethereum-based: 0x + 40 hex chars
            return /^0x[a-fA-F0-9]{40}$/.test(address);

        case "SOL":
            // Solana: base58, 32-44 chars
            return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);

        case "TRX":
            // Tron: starts with T, base58check
            return /^T[a-zA-HJ-NP-Z0-9]{33}$/.test(address);

        case "LTC":
            // Litecoin: legacy (L, M), bech32 (ltc1)
            return /^(L|M|ltc1)[a-zA-HJ-NP-Z0-9]{26,39}$/.test(address);

        case "XMR":
            // Monero: 95-character address (starts with 4 or 8), integrated addresses are 106 chars
            return /^(4|8)[0-9AB][1-9A-HJ-NP-Za-km-z]{93,105}$/.test(address);

        case "ADA":
            // Cardano: Shelley (addr1...), legacy (DdzFF...), etc.
            return /^(addr1|DdzFF)[0-9a-zA-Z]{20,}$/.test(address);

        case "DOT":
            // Polkadot: base58, starts with 1, 2, 3, or 1x prefix (generally 48 chars)
            return /^[1-9A-HJ-NP-Za-km-z]{47,49}$/.test(address);

        case "XRP":
            // Ripple: starts with 'r', base58, length 25–35
            return /^r[0-9a-zA-Z]{24,34}$/.test(address);
        
        case "SUI":
            // Sui: 0x + 64 hex chars (66 total length)
            return /^0x[a-fA-F0-9]{64}$/.test(address);

        default:
            throw new Error(`Address validation for network '${network}' is not implemented.`);
    }
}


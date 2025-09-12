import { addresses } from "@/lib/addresses";
import { tokens } from "@/lib/tokens";
import { Token } from "@/types/types";
import { create } from "zustand";

type DepositType = "fixed" | "any" | null
type Status = "pending" | "confirmed" | "completed" | "failed" | "expired"

interface DataStore {
    currentToken: Token
    depositType: DepositType
    amount: number
    depositAddress: string
    status: Status
    withdrwKey: string | null
    orderId: string | null

    setCurrentToken: (token: Token) => void
    setDepositType: (t: DepositType) => void
    setAmount: (amount: number) => void
    setStatus: (status: Status) => void
    setWithdrawalKey: (key: string | null) => void
    setOrderId: (id: string | null) => void
}

export const useStore = create<DataStore>((set, get) => ({
    currentToken: tokens[1],
    depositType: null,
    amount: 0.00,
    depositAddress: addresses["TRX"],
    status: "pending" as Status,
    withdrwKey: null,
    orderId: null,

    setCurrentToken: (token: Token) => {
        set({currentToken: token})

        const state = get()

        set({depositAddress: addresses[token.network]})

        if(state.depositType === "fixed") {
            set({ amount: token.fixedOptions[0] })
        } else if (state.depositType === "any") {
            set({ amount: 0.00 })
        }
    },

    setDepositType: (t: DepositType) => {
        set({depositType: t})

        const state = get()

        if (t === "fixed") {
            set({ amount: state.currentToken.fixedOptions[0]})
        } else if (t === "any") {
            set({ amount: 0.00 })
        }
    },

    setAmount: (a: number) => set({
        amount: a
    }),
    
    setStatus: (status: Status) => set({
        status: status
    }),

    setWithdrawalKey: (key: string | null) => set({
        withdrwKey: key
    }),

    setOrderId: (id: string | null) => set({
        orderId: id
    })
}))
"use client"

import React, { useEffect, useState, useTransition } from 'react'
import TokenSelector from './TokenSelector'
import { useStore } from '@/store/store'
import { Button } from '../ui/button'
import { Dropdown } from '../ui/dropdown'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/auth/AuthContext'
import axios from 'axios'
import { toast } from 'sonner'

const CreateDeposit = () => {

    const {
        currentToken,
        setCurrentToken,
        depositType,
        setDepositType,
        amount,
        setAmount,
        depositAddress,
        setOrderId,
        setWithdrawalKey
    } = useStore()

    const [display, setDisplay] = useState("");

    const [dropdownOpen, setDropDownOpen] = useState<boolean>(false)

    const toggle = () => setDropDownOpen(prev => !prev)

    useEffect(() => {
        setDropDownOpen(false)
    }, [depositType])

    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const { isAuthenticated } = useAuth()

    const handleDeposit = () => {
        startTransition(async () => {
            try {
                const url = isAuthenticated ? "/deposit" : "/deposit/anon"

                const { data } = await axios.post(url, {
                    token: currentToken.symbol,
                    network: currentToken.network,
                    amount,
                    type: depositType,
                    depositAddress
                })

                setOrderId(data.data._id)
                setWithdrawalKey(data.data.withdrawkey || null)

                if (isAuthenticated) {
                    router.push("/deposit")
                } else {
                    router.push("/anon-deposit")
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const serverMessage =
                        error.response?.data?.message ||
                        error.response?.data?.error ||
                        error.message;

                    toast.error(serverMessage);
                } else {
                    console.log(error)
                    toast.error("Something went wrong");
                }
            }
        })
    }

    return (
        <div className='flex flex-col gap-10'>
            <div className="grid grid-cols-2 gap-6">

                <div className="flex flex-col gap-3">
                    <label htmlFor="" className="text-foreground-muted font-medium">
                        Deposit Asset
                    </label>

                    <TokenSelector
                        currentToken={currentToken}
                        setToken={setCurrentToken}
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <label htmlFor="" className="text-foreground-muted font-medium">
                        Deposit Type
                    </label>

                    <div className='grid grid-cols-2 gap-3'>
                        <button className={`w-full py-2 px-4 border uppercase h-10.5 hover:bg-accent cursor-pointer hover:rounded-full ${depositType === "fixed" ? "bg-accent rounded-full" : "bg-transparent rounded-md"}`} onClick={() => {
                            setDepositType("fixed")
                        }}>
                            Fixed
                        </button>

                        <button className={`w-full py-2 px-4 border uppercase h-10.5 hover:bg-accent cursor-pointer hover:rounded-full ${depositType === "any" ? "bg-accent rounded-full" : "bg-transparent rounded-md"}`} onClick={() => {
                            setDepositType("any")
                        }}>
                            any
                        </button>
                    </div>
                </div>
            </div>

            {depositType && <div className='grid grid-cols-2 gap-6 items-end pb-6'>
                <div className="flex flex-col gap-3 relative">
                    <label htmlFor="" className="text-foreground-muted font-medium">
                        Select Amount
                    </label>

                    {depositType === "any" && <input
                        className="border rounded-md py-3 px-4 focus:outline-none"
                        placeholder="0.00"
                        type="number"
                        value={display}
                        onChange={(e) => {
                            const val = e.target.value;
                            setDisplay(val);
                            setAmount(val === "" ? 0 : Number(val));
                        }}
                    />}

                    {depositType === "any" && (amount < currentToken.minAmount) && <p className='text-destructive absolute -bottom-6 left-0'>
                        Minimum Amount: {currentToken.minAmount} {currentToken.symbol}
                    </p>}

                    {depositType === "fixed" && <button
                        className="border rounded-md py-3 px-4 focus:outline-none cursor-pointer text-start"
                        onClick={toggle}
                    >
                        {amount}
                    </button>}

                    {dropdownOpen && depositType === "fixed" && <div className='w-full border px-1 py-1 rounded-md absolute top-[100%] bg-background-subtle flex flex-col'>
                        {currentToken.fixedOptions.map((opt, i) => (
                            <button key={i} className='px-3 py-2 text-start hover:bg-[#dedad4] rounded-md' onClick={() => {
                                setAmount(opt)
                                setDropDownOpen(false)
                            }}>
                                {opt}
                            </button>
                        ))}
                    </div>}
                </div>

                <div className='flex justify-end'>
                    <Button className='py-3 px-6' disabled={
                        isPending || (depositType === "any" && amount < currentToken.minAmount)
                    }
                        onClick={handleDeposit}
                    >
                        Start deposit
                        {isPending && <Loader className='animate-spin' />}
                    </Button>
                </div>
            </div>}
        </div>
    )
}

export default CreateDeposit
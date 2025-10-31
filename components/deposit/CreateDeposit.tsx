"use client"

import React, { useEffect, useState, useTransition } from 'react'
import TokenSelector from './TokenSelector'
import { useStore } from '@/store/store'
import { Button } from '../ui/button'
import { Dropdown } from '../ui/dropdown'
import { ArrowRight, Loader } from 'lucide-react'
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
        <div className='flex flex-col gap-10 bg-background-subtle p-6'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="flex flex-col gap-3">
                    <label htmlFor="" className="text-foreground-muted font-medium text-sm">
                        Deposit Asset
                    </label>

                    <TokenSelector
                        currentToken={currentToken}
                        setToken={setCurrentToken}
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <label htmlFor="" className="text-foreground-muted font-medium text-sm">
                        Deposit Type
                    </label>

                    <div className='grid grid-cols-2 gap-1 bg-muted p-1 h-[44px] rounded-[8px]'>
                        <button className={`w-full py-2 px-4 uppercase h-full hover:bg-background cursor-pointer rounded-[8px] ${depositType === "fixed" ? "bg-background" : "bg-transparent"}`} onClick={() => {
                            setDepositType("fixed")
                        }}>
                            Fixed
                        </button>

                        <button className={`w-full py-2 px-4 uppercase h-full hover:bg-background cursor-pointer rounded-[8px] ${depositType === "any" ? "bg-background" : "bg-transparent"}`} onClick={() => {
                            setDepositType("any")
                        }}>
                            any
                        </button>
                    </div>
                </div>
            </div>

            {depositType && <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-end pb-6'>
                <div className="flex flex-col gap-3 relative">
                    <label htmlFor="" className="text-foreground-muted font-medium text-sm">
                        Select Amount
                    </label>

                    {depositType === "any" && <input
                        className="border border-black/15 rounded-[8px] h-[44px] px-4 focus:outline-none text-foreground-muted"
                        placeholder="0.00"
                        type="number"
                        value={display}
                        onChange={(e) => {
                            const val = e.target.value;
                            setDisplay(val);
                            setAmount(val === "" ? 0 : Number(val));
                        }}
                    />}

                    {depositType === "fixed" &&
                        <div className='flex items-center gap-1.5'>
                            {currentToken.fixedOptions.map((opt, i) => (
                                <button key={i} className={`h-[44px] px-[14px] flex items-center rounded-full cursor-pointer ${amount === opt ? "bg-background-strong text-white" : "bg-muted text-muted-foreground"}`} onClick={() => {
                                    setAmount(opt)
                                }}>
                                    {opt}
                                </button>
                            ))}
                        </div>
                    }
                </div>

                <div className={`flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 ${depositType == "any" ? "justify-between" : "justify-end"}`}>

                    {depositType === "any" && (amount < currentToken.minAmount) &&
                        <div className='flex items-center gap-2'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_286_701)">
                                    <circle cx="12" cy="12" r="12" fill="#DEDAD4" />
                                    <path d="M12 6V14M12 16V18" stroke="#505355" strokeWidth="2" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_286_701">
                                        <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                            <p className='text-sm text-foreground-muted font-medium leading-[140%]'>
                                Min Amount: < br className='hidden md:block'/> {currentToken.minAmount} {currentToken.symbol}
                            </p>
                        </div>
                    }

                    <Button className='py-3 px-6 rounded-full w-full md:w-max' disabled={
                        isPending || (depositType === "any" && amount < currentToken.minAmount)
                    }
                        onClick={handleDeposit}
                    >
                        Start deposit
                        {isPending ? <Loader className='animate-spin' /> : <ArrowRight />}
                    </Button>
                </div>
            </div>}
        </div>
    )
}

export default CreateDeposit
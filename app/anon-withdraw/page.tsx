"use client"

import { Button } from '@/components/ui/button'
import { validateAddress } from '@/lib/validateAddress'
import { Deposit } from '@/types/types'
import axios from 'axios'
import { CheckCircle, ChevronRight, CircleX, Clock3, Key, Loader, LockOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState, useTransition } from 'react'
import { toast } from 'sonner'

const AnonWithdrawPage = () => {
    const [withdrawalKey, setWithdrawalKey] = useState<string>("")
    const [isPending, startTransition] = useTransition()
    const [deposit, setDeposit] = useState<Deposit | null>(null)
    const [error, setError] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [addressError, setAddressError] = useState<string>("")
    const [isWithdrawPending, startWithdraw] = useTransition()
    const router = useRouter()

    const validateKey = () => {
        startTransition(async () => {
            try {
                const { data } = await axios.get(`/deposit/validate/${withdrawalKey}`)

                console.log(data)

                if (!data.success) {
                    setError(data.data.message)
                    toast.error(data.data.message)
                    setTimeout(() => setError(""), 10000)
                    return
                }

                setDeposit(data.data)
                toast.info("Withdraw Key Verified")
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

    type Status = "pending" | "confirmed" | "completed" | "failed" | "expired"

    const getStatusColor = (status: Status) => {
        switch (status) {
            case "pending":
                return "text-amber-600"
            case "confirmed":
                return "text-blue-500"
            case "completed":
                return "text-green-500"
            case "failed":
                return "text-red-500"
            case "expired":
                return "text-gray-500"
            default:
                return ""
        }
    }

    const getStatusIcon = (status: Status): React.ReactNode => {
        switch (status) {
            case "pending":
                return <Clock3 className='text-amber-600 w-4' />
            case "confirmed":
                return <CheckCircle className='text-blue-500 w-4' />
            case "completed":
                return <CheckCircle className='text-green-500 w-4' />
            case "failed":
                return <CircleX className='text-red-500 w-4' />
            case "expired":
                return <CircleX className='text-gray-500 w-4' />
            default:
                return <div></div>
        }
    }


    const handleWithdraw = () => {

        if (!deposit) return

        const addressValid = validateAddress(deposit?.network, address)

        if (!addressValid) {
            setAddressError("Invalid address")
            setTimeout(() => setAddressError(""), 10000)
            return
        }

        startWithdraw(async () => {
            try {
                const { data } = await axios.post("/withdraw/anon", {
                    depositId: deposit._id,
                    address
                })

                toast.info("Request sent!")

                router.push("/")

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
        <section className="py-16">
            <div className="container flex flex-col">

                <div className={`rounded-t-xl ${deposit ? "rounded-b-0" : "rounded-b-xl"} p-6 bg-background-subtle space-y-6`}>

                    <div className="flex items-center gap-2">
                        <LockOpen className='text-primary' strokeWidth={3} />
                        <h2 className="capitalize font-medium text-2xl" >
                            Anonymous Withdraw
                        </h2>
                    </div>

                    {!deposit && <div className='flex flex-col gap-3'>
                        <label htmlFor="" className="text-foreground-muted font-medium">
                            Withdraw Key
                        </label>

                        <input
                            className="border rounded-[8px] h-[44px] px-4 focus:outline-none text-foreground-subtle"
                            value={withdrawalKey}
                            onChange={(e) => setWithdrawalKey(e.target.value)}
                            placeholder='Withdrawal Key'
                        />

                        {/* {error && <p className='capitalize text-destructive text-sm'>
                            {error}
                        </p>} */}
                    </div>}

                    {deposit &&
                        <div className="flex flex-col mt-4 bg-background rounded-xl p-6 text-sm md:text-base">

                            <div className='flex items-center justify-between pb-3 border-b border-black/10'>
                                <span className='font-medium'>
                                    Deposit Asset:
                                </span>

                                <span className='text-foreground-muted'>
                                    {deposit?.token}
                                </span>
                            </div>

                            <div className='flex items-center justify-between py-3 border-b border-black/10'>
                                <span className='font-medium'>
                                    Deposit Amount:
                                </span>

                                <span className='text-foreground-muted'>
                                    {deposit?.amount}
                                </span>
                            </div>

                            <div className='flex items-center gap-2 justify-between py-3 border-b border-black/10'>
                                <span className='font-medium'>
                                    Deposit Type:
                                </span>

                                <span className='text-foreground-muted'>
                                    {deposit.type === "fixed" ? "Fixed" : "Any"}
                                </span>
                            </div>

                            <div className='flex items-center justify-between py-3 border-b border-black/10'>
                                <span className='font-medium'>
                                    Deposit Address:
                                </span>

                                <span className='text-foreground-muted text-sm hidden md:block'>
                                    {deposit.depositAddress}
                                </span>

                                <span className='text-foreground-muted text-sm md:hidden'>
                                    {`${deposit.depositAddress.slice(0,4)}...${deposit.depositAddress.slice(-4)}`}
                                </span>
                            </div>

                            <div className='flex items-center justify-between pt-3'>
                                <span className='font-medium'>
                                    Status:
                                </span>

                                <div className='flex items-center gap-2'>
                                    <span className={`capitalize ${getStatusColor(deposit.status)}`}>
                                        {deposit.status}
                                    </span>

                                    {getStatusIcon(deposit.status)}
                                </div>
                            </div>
                        </div>
                    }

                    {deposit &&
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="" className="text-foreground-muted font-medium">
                                Withdraw Address
                            </label>

                            <input
                                className="border rounded-md h-[44px] px-4 text-foreground-subtle"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder='Withdraw Address'
                            />

                            {addressError && <p className='capitalize text-destructive text-sm'>
                                {addressError}
                            </p>}
                        </div>
                    }

                    {!deposit && <Button className='rounded-full' disabled={isPending || !withdrawalKey} onClick={validateKey} >
                        Validate key
                        {isPending ? <Loader className='animate-spin' /> : <Key />}
                    </Button>}

                    {deposit && <Button variant={"secondary"} className=' rounded-full' disabled={isWithdrawPending || !address}
                        onClick={handleWithdraw}
                    >
                        proceed with withdraw
                        
                        {isWithdrawPending ? <Loader className='animate-spin' /> : <ChevronRight />}
                    </Button>}


                </div>

                {deposit && <div className="rounded-b-xl p-6 bg-background-strong">
                    <p className="text-white leading-[24px]">
                        <span className="text-accent font-bold">Note:</span> Receiving Amount inlcudes 5% service Fee, but the actual Received Amount may slightly differ from the one displayed due to gas fee at the time of withdraw.
                    </p>
                </div>}
            </div>
        </section>
    )
}

export default AnonWithdrawPage
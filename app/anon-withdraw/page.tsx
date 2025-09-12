"use client"

import { Button } from '@/components/ui/button'
import { validateAddress } from '@/lib/validateAddress'
import { Deposit } from '@/types/types'
import axios from 'axios'
import { ChevronRight, Loader, LockOpen } from 'lucide-react'
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
        <section className="py-6">
            <div className="container flex flex-col gap-6">

                <div className="rounded-xl p-6 bg-background-subtle space-y-6">

                    <div className="flex items-center gap-2">
                        <LockOpen className='text-accent' strokeWidth={4} />
                        <h2 className="uppercase font-medium text-xl" >
                            Anonymous Withdraw
                        </h2>
                    </div>

                    {!deposit && <div className='flex flex-col gap-3'>
                        <label htmlFor="" className="text-foreground-muted font-medium">
                            Withdraw Key
                        </label>

                        <input
                            className="border rounded-md py-3 px-4 focus:outline-primary outline-1"
                            value={withdrawalKey}
                            onChange={(e) => setWithdrawalKey(e.target.value)}
                        />

                        {error && <p className='capitalize text-destructive text-sm'>
                            {error}
                        </p>}
                    </div>}

                    {deposit && <div className="flex flex-col gap-2 mt-10 border border-border rounded-xl p-6 ">
                        <div className='flex items-center gap-2'>
                            <span className='font-medium'>
                                Asset:
                            </span>

                            <span className='text-foreground-muted font-medium'>
                                {deposit?.token}
                            </span>
                        </div>

                        <div className='flex items-center gap-2'>
                            <span className='font-medium'>
                                Network:
                            </span>

                            <span className='text-foreground-muted font-medium'>
                                {deposit?.network}
                            </span>
                        </div>

                        <div className='flex items-center gap-2'>
                            <span className='font-medium'>
                                Amount:
                            </span>

                            <span className='text-foreground-muted font-medium'>
                                {deposit?.amount}
                            </span>
                        </div>

                        <div className='flex items-center gap-2'>
                            <span className='font-medium'>
                                Type:
                            </span>

                            <span className='text-foreground-muted font-medium'>
                                {deposit?.type === "fixed" ? "Fixed" : "Any"}
                            </span>
                        </div>

                        <div className='flex items-center gap-2'>
                            <span className='font-medium'>
                                Status:
                            </span>

                            <span className={`font-medium capitalize ${getStatusColor(deposit?.status || "pending")}`}>
                                {deposit?.status}
                            </span>
                        </div>
                    </div>}

                    {deposit && <div className='flex flex-col gap-3'>
                        <label htmlFor="" className="text-foreground-muted font-medium">
                            Withdraw Address
                        </label>

                        <input
                            className="border rounded-md py-3 px-4 focus:outline-primary outline-1"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />

                        {addressError && <p className='capitalize text-destructive text-sm'>
                            {addressError}
                        </p>}
                    </div>}

                    {!deposit && <Button className='mt-4' disabled={isPending || !withdrawalKey} onClick={validateKey}>
                        Validate key
                        {isPending && <Loader className='animate-spin' />}
                    </Button>}

                    {deposit && <Button variant={"secondary"} className='mt-4 rounded-full hover:bg-accent' disabled={isWithdrawPending || !address}
                    onClick={handleWithdraw}
                    >
                        proceed with withdraw
                        <ChevronRight />
                        {isWithdrawPending && <Loader className='animate-spin' />}
                    </Button>}


                </div>

                {deposit && <div className="rounded-xl p-6 bg-background-strong">
                    <p className="text-white leading-[1.6]">
                        <span className="text-accent font-bold">Note:</span> Receiving Amount inlcudes 5% service Fee, but the actual Received Amount may slightly differ from the one displayed due to gas fee at the time of withdraw.
                    </p>
                </div>}
            </div>
        </section>
    )
}

export default AnonWithdrawPage
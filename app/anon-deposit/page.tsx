"use client"


import { Button } from '@/components/ui/button'
import { ORDER_CONFIRMED, ORDER_CREATED } from '@/lib/events'
import { useSocket } from '@/providers/SocketProvider'
import { useStore } from '@/store/store'
import { OrderEventPayload } from '@/types/types'
import axios from 'axios'
import { CheckCircle, CircleX, Clock3, Download, Files, HatGlasses, Plus } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { toast } from 'sonner'

const AnonDeposit = () => {

    const {
        currentToken,
        amount,
        depositAddress,
        withdrwKey,
        status,
        depositType,
        orderId,
        setStatus
    } = useStore()

    const copy = (text: string) => {
        navigator.clipboard.writeText(text)
        toast.info("coppied")
    }

    const downloadKeys = () => {
        const content = `Withdraw Key: ${withdrwKey}`
        const blob = new Blob([content], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'withdraw-key.txt'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
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

    const [socket, isConnected] = useSocket();

    const updateDeposit = async (status: Status) => {
        try {
            const { data } = await axios.patch(`/deposit/update/${orderId}`, {
                status
            })

            toast.info(`Deposit ${status}`)
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
    }

    useEffect(() => {
        if (!socket || !isConnected) return;

        const onOrderCreated = (data: OrderEventPayload) => {
            if (data.orderIds.includes(orderId)) {
                setStatus("confirmed")
                updateDeposit("confirmed")
            }
        };
        const onOrderConfirmed = (data: OrderEventPayload) => {
            if (data.orderIds.includes(orderId)) {
                setStatus("completed")
                updateDeposit("completed")
            }
        };

        socket.on(ORDER_CREATED, onOrderCreated);
        socket.on(ORDER_CONFIRMED, onOrderConfirmed);

        return () => {
            socket.off(ORDER_CREATED, onOrderCreated);
            socket.off(ORDER_CONFIRMED, onOrderConfirmed);
        }

    }, [socket, isConnected, setStatus]);

    return (
        <section className="py-16">
            <div className="container flex flex-col">

                <div className="rounded-t-xl p-6 bg-background-subtle space-y-4">

                    <div className="flex items-center gap-2">

                        <HatGlasses className='text-primary' strokeWidth={2} />
                        <h2 className="capitalize font-medium text-2xl">
                            Deposit without account
                        </h2>
                    </div>

                    <div className="flex flex-col mt-4 bg-background rounded-xl p-6 ">

                        <div className='flex items-center justify-between pb-3 border-b border-black/10'>
                            <span className='font-medium'>
                                Deposit Asset:
                            </span>

                            <span className='text-foreground-muted'>
                                {currentToken.symbol}
                            </span>
                        </div>

                        <div className='flex items-center justify-between py-3 border-b border-black/10'>
                            <span className='font-medium'>
                                Deposit Amount:
                            </span>

                            <span className='text-foreground-muted'>
                                {amount}
                            </span>
                        </div>

                        <div className='flex items-center gap-2 justify-between py-3 border-b border-black/10'>
                            <span className='font-medium'>
                                Deposit Type:
                            </span>

                            <span className='text-foreground-muted'>
                                {depositType === "fixed" ? "Fixed" : "Any"}
                            </span>
                        </div>

                        <div className='flex items-center justify-between py-3 border-b border-black/10'>
                            <span className='font-medium'>
                                Deposit Address:
                            </span>

                            <div className='flex items-center gap-2'>
                                <span className='text-foreground-muted text-sm'>
                                    {depositAddress}
                                </span>

                                <button className='text-sm text-foreground/80 cursor-pointer' onClick={() => copy(depositAddress)}>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 4.5V2.25H15.75V10.5H13.5M2.25 6H12V15.75H2.25V6Z" stroke="#27282B" strokeOpacity="0.6" strokeWidth="1.5" />
                                    </svg>

                                </button>
                            </div>
                        </div>

                        <div className='flex items-center justify-between py-3 border-b border-black/10'>
                            <span className='font-medium'>
                                Status:
                            </span>

                            <div className='flex items-center gap-2'>
                                <span className={`capitalize ${getStatusColor(status)}`}>
                                    {status}
                                </span>

                                {getStatusIcon(status)}
                            </div>


                        </div>

                        <div className='flex items-center justify-between py-3'>
                            <span className='font-medium'>
                                Withdraw Key:
                            </span>

                            <div className='flex items-center gap-2'>
                                <span className='text-foreground-muted'>
                                    {withdrwKey}
                                </span>

                                {withdrwKey && <button className='text-sm text-foreground/80 cursor-pointer' onClick={() => copy(withdrwKey)}>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 4.5V2.25H15.75V10.5H13.5M2.25 6H12V15.75H2.25V6Z" stroke="#27282B" strokeOpacity="0.6" strokeWidth="1.5" />
                                    </svg>
                                </button>}
                            </div>
                        </div>

                        <Button variant={"secondary"} className="cursor-pointer w-full mt-4 rounded-full" onClick={downloadKeys}>
                            Download withdraw key
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.00108 3.49738e-07L6.00108 8M6.00108 8L10 4.35903M6.00108 8L2 4.35903M2 11L10 11" stroke="white" strokeWidth="1.5" />
                            </svg>
                        </Button>
                    </div>

                    <Button asChild className='w-full rounded-full bg-muted text-muted-foreground hover:bg-muted/80'>
                        <Link href={"/"}>
                            new deposit 
                            <Plus />
                        </Link>
                    </Button>

                </div>

                <div className="rounded-b-xl p-6 bg-background-strong">
                    <p className="text-white leading-[24px]">
                        <span className="text-accent">Important:</span> Save your Withdraw Key — you'll need it to retrieve and withdraw your funds.
                    </p>
                </div>

            </div>
        </section>
    )
}

export default AnonDeposit

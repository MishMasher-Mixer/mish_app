"use client"

import { Button } from '@/components/ui/button'
import { ORDER_CONFIRMED, ORDER_CREATED } from '@/lib/events'
import { useSocket } from '@/providers/SocketProvider'
import { useStore } from '@/store/store'
import { OrderEventPayload } from '@/types/types'
import { CheckCircle, CircleX, Clock3, Files, Plus } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { toast } from 'sonner'

const DepositPage = () => {
    const {
        currentToken,
        amount,
        depositAddress,
        withdrwKey,
        status,
        depositType,
        setStatus,
        orderId
    } = useStore()

    const copy = (text: string) => {
        navigator.clipboard.writeText(text)
        toast.info("coppied")
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

    useEffect(() => {
        if (!socket || !isConnected) return;

        const onOrderCreated = (data: OrderEventPayload) => {
            if (data.orderIds.includes(orderId)) {
                setStatus("confirmed")
            }
        };
        const onOrderConfirmed = (data: OrderEventPayload) => {
            if (data.orderIds.includes(orderId)) {
                setStatus("completed")
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
            <div className="container flex flex-col gap-6">

                <div className="rounded-xl p-6 bg-background-subtle space-y-4">

                    <div className="flex items-center gap-2">

                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_286_462)">
                                <circle cx="13" cy="13" r="13" fill="#765BFF" />
                                <path d="M13 6.5V13M13 19.5V13M13 13H6.5M13 13H19.5" stroke="white" strokeWidth="2" />
                            </g>
                            <defs>
                                <clipPath id="clip0_286_462">
                                    <rect width="26" height="26" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                        <h2 className="capitalize font-medium text-2xl">
                            New deoposit
                        </h2>
                    </div>

                    <div className="flex flex-col mt-4 bg-background rounded-xl p-6 text-sm md:text-base">

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
                                <span className='text-foreground-muted text-sm hidden md:block'>
                                    {depositAddress}
                                </span>

                                <span className='text-foreground-muted text-sm md:hidden'>
                                    {`${depositAddress.slice(0,4)}...${depositAddress.slice(-4)}`}
                                </span>

                                <button className='text-sm text-foreground/80 cursor-pointer' onClick={() => copy(depositAddress)}>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 4.5V2.25H15.75V10.5H13.5M2.25 6H12V15.75H2.25V6Z" stroke="#27282B" strokeOpacity="0.6" strokeWidth="1.5" />
                                    </svg>

                                </button>
                            </div>
                        </div>

                        <div className='flex items-center justify-between pt-3'>
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
                        
                    </div>

                    <Button asChild className='w-full rounded-full bg-muted text-muted-foreground hover:bg-muted/80'>
                        <Link href={"/"}>
                            new deposit 
                            <Plus />
                        </Link>
                    </Button>

                </div>
            </div>
        </section>
    )
}

export default DepositPage
"use client"

import { Button } from '@/components/ui/button'
import { ORDER_CONFIRMED, ORDER_CREATED } from '@/lib/events'
import { useSocket } from '@/providers/SocketProvider'
import { useStore } from '@/store/store'
import { OrderEventPayload } from '@/types/types'
import { Files } from 'lucide-react'
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
        <section className="py-6">
            <div className="container flex flex-col gap-6">

                <div className="rounded-xl p-6 bg-background-subtle space-y-6">

                    <div className="flex items-center gap-2">

                        <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                            <span className="text-white leading-none text-sm">
                                +
                            </span>
                        </div>
                        <h2 className="uppercase font-medium text-xl">
                            New deoposit
                        </h2>
                    </div>

                    <div className="flex flex-col gap-2 mt-10 border border-border rounded-xl p-6 ">
                        <div className='flex items-center gap-2'>
                            <span className='font-medium'>
                                Deposit Asset:
                            </span>

                            <span className='text-foreground-muted font-medium'>
                                {currentToken.symbol}
                            </span>
                        </div>

                        <div className='flex items-center gap-2'>
                            <span className='font-medium'>
                                Deposit Amount:
                            </span>

                            <span className='text-foreground-muted font-medium'>
                                {amount}
                            </span>
                        </div>

                        <div className='flex items-center gap-2'>
                            <span className='font-medium'>
                                Deposit Type:
                            </span>

                            <span className='text-foreground-muted font-medium'>
                                {depositType === "fixed" ? "Fixed" : "Any"}
                            </span>
                        </div>

                        <div className='flex items-center gap-2'>
                            <span className='font-medium'>
                                Deposit Address:
                            </span>

                            <span className='text-foreground-muted font-medium'>
                                {depositAddress}
                            </span>

                            <button className='text-sm text-foreground/80 cursor-pointer' onClick={() => copy(depositAddress)}>
                                <Files className='w-4.5' color='#6e6e7d' />
                            </button>
                        </div>

                        <div className='flex items-center gap-2'>
                            <span className='font-medium'>
                                Status:
                            </span>

                            <span className={`font-medium capitalize ${getStatusColor(status)}`}>
                                {status}
                            </span>
                        </div>

                    </div>

                    <Button variant={"secondary"} className="bg-muted text-foreground cursor-pointer hover:bg-muted/50 w-max mt-2" asChild>
                        <Link href={"/"}>
                            New deposit
                        </Link>
                    </Button>

                </div>
            </div>
        </section>
    )
}

export default DepositPage
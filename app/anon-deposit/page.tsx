"use client"

import { Button } from '@/components/ui/button'
import { ORDER_CONFIRMED, ORDER_CREATED } from '@/lib/events'
import { useSocket } from '@/providers/SocketProvider'
import { useStore } from '@/store/store'
import { OrderEventPayload } from '@/types/types'
import axios from 'axios'
import { Download, Files, HatGlasses } from 'lucide-react'
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
        <section className="py-6">
            <div className="container flex flex-col gap-6">

                <div className="rounded-xl p-6 bg-background-subtle space-y-6">

                    <div className="flex items-center gap-2">

                        <HatGlasses className='text-accent' strokeWidth={2} />
                        <h2 className="uppercase font-medium text-xl">
                            Deposit without account
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

                        <div className='flex items-center gap-2'>
                            <span className='font-medium'>
                                Withdraw Key:
                            </span>

                            <span className='text-foreground-muted font-medium'>
                                {withdrwKey}
                            </span>

                            {withdrwKey && <button className='text-sm text-foreground/80 cursor-pointer' onClick={() => copy(withdrwKey)}>
                                <Files className='w-4.5' color='#6e6e7d' />
                            </button>}
                        </div>

                        <Button variant={"secondary"} className="bg-muted text-foreground cursor-pointer hover:bg-muted/50 w-max mt-4" onClick={downloadKeys}>
                            <Download />
                            Download withdraw key
                        </Button>
                    </div>

                </div>

                <div className="rounded-xl p-6 bg-background-strong">
                    <p className="text-white leading-[1.6]">
                        <span className="text-accent font-bold">Important:</span> Save your Withdraw Key — you'll need it to retrieve and withdraw your funds.
                    </p>
                </div>

            </div>
        </section>
    )
}

export default AnonDeposit
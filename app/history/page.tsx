"use client"

import { useAuth } from '@/auth/AuthContext'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ORDER_CONFIRMED, ORDER_CREATED } from '@/lib/events'
import { useSocket } from '@/providers/SocketProvider'
import { useStore } from '@/store/store'
import { Deposit, OrderEventPayload } from '@/types/types'
import axios from 'axios'
import { CheckCircle, CircleX, Clock3, Download, Files, HatGlasses, History } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import moment from 'moment'
import { Dialog, DialogDescription, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { DialogContent, DialogTitle } from '@radix-ui/react-dialog'
import WithdrawDialog from '@/components/withdraw/Withdraw'

const HistoryPage = () => {

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
    const [history, setHistory] = useState<Deposit[]>([])
    const { isAuthenticated } = useAuth()

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

    const fetchHistory = async () => {
        if (!isAuthenticated) return

        try {
            const { data } = await axios.get("/deposit/history")

            console.log(data)

            setHistory(data.data)
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
        fetchHistory()
    }, [isAuthenticated])

    // const handleWithdraw = () => {

    //     if (!deposit) return

    //     const addressValid = validateAddress(deposit?.network, address)

    //     if (!addressValid) {
    //         setAddressError("Invalid address")
    //         setTimeout(() => setAddressError(""), 10000)
    //         return
    //     }

    //     startWithdraw(async () => {
    //         try {
    //             const { data } = await axios.post("/withdraw/anon", {
    //                 depositId: deposit._id,
    //                 address
    //             })

    //             toast.info("Request sent!")

    //             router.push("/")

    //         } catch (error) {
    //             if (axios.isAxiosError(error)) {
    //                 const serverMessage =
    //                     error.response?.data?.message ||
    //                     error.response?.data?.error ||
    //                     error.message;

    //                 toast.error(serverMessage);
    //             } else {
    //                 console.log(error)
    //                 toast.error("Something went wrong");
    //             }
    //         }
    //     })
    // }

    return (
        <section className="py-16 relative">
            <div className="container flex flex-col gap-6">

                <div className="rounded-xl p-6 bg-background-subtle space-y-6">

                    <div className="flex items-center gap-2">

                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_286_519)">
                                <circle cx="13" cy="13" r="13" fill="#765BFF" />
                                <path d="M13.0003 6L13.0003 16.5405M13.0003 16.5405L18.3322 11.7433M13.0003 16.5405L7.6655 11.7433M19 19.541L7 19.541" stroke="white" strokeWidth="1.5" />
                            </g>
                            <defs>
                                <clipPath id="clip0_286_519">
                                    <rect width="26" height="26" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                        <h2 className="capitalize font-medium text-2xl">
                            Deposit History
                        </h2>
                    </div>

                    {history.length == 0 && <p>
                        Nessun deposito effettuato.
                    </p>}

                    {history.length > 0 && <Table className='relative'>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='text-foreground-muted'>
                                    Asset
                                </TableHead>

                                <TableHead className='text-foreground-muted'>
                                    Network
                                </TableHead>

                                <TableHead className='text-foreground-muted'>
                                    Amount
                                </TableHead>

                                <TableHead className='text-foreground-muted'>
                                    Time
                                </TableHead>

                                <TableHead className='text-foreground-muted text-end'>
                                    Status
                                </TableHead>

                                <TableHead className='text-end'>

                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {history.map(row => (
                                <TableRow key={row._id}>
                                    <TableCell>
                                        <div className='flex items-center gap-2'>
                                            <img src={`/assets/tokens/${row.token.toLowerCase()}.svg`} alt="" className='w-4 h-4' />
                                            {row.token}
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        {row.network}
                                    </TableCell>

                                    <TableCell>
                                        {row.amount.toLocaleString()}
                                    </TableCell>

                                    <TableCell>
                                        {moment(row.timestamp).format("DD/MM/YY HH:mm")}
                                    </TableCell>

                                    <TableCell className={`${getStatusColor(row.status)} text-base`}>
                                        <div className='flex items-center gap-2 capitalize justify-end'>
                                            {row.status}
                                            {getStatusIcon(row.status)}
                                        </div>
                                    </TableCell>

                                    <TableCell className='flex justify-end'>

                                        <WithdrawDialog deposit={row} refetch={fetchHistory} />

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>}

                </div>

            </div>
        </section>
    )
}

export default HistoryPage
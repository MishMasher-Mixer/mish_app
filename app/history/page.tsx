"use client"

import { useAuth } from '@/auth/AuthContext'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ORDER_CONFIRMED, ORDER_CREATED } from '@/lib/events'
import { useSocket } from '@/providers/SocketProvider'
import { useStore } from '@/store/store'
import { Deposit, OrderEventPayload } from '@/types/types'
import axios from 'axios'
import { Download, Files, HatGlasses, History } from 'lucide-react'
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
        <section className="py-6 relative">
            <div className="container flex flex-col gap-6">

                <div className="rounded-xl p-6 bg-background-subtle space-y-6">

                    <div className="flex items-center gap-2">

                        <History className='text-accent' strokeWidth={3} />
                        <h2 className="uppercase font-medium text-xl">
                            Deposit History
                        </h2>
                    </div>

                    {history.length == 0 && <p>
                        Nessun deposito effettuato.
                    </p>}

                    {history.length > 0 && <Table className='relative'>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    Asset
                                </TableHead>

                                <TableHead>
                                    Network
                                </TableHead>

                                <TableHead>
                                    Amount
                                </TableHead>

                                <TableHead>
                                    Status
                                </TableHead>

                                <TableHead>
                                    Time
                                </TableHead>

                                <TableHead className='text-end'>
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {history.map(row => (
                                <TableRow key={row._id}>
                                    <TableCell>
                                        {row.token}
                                    </TableCell>

                                    <TableCell>
                                        {row.network}
                                    </TableCell>

                                    <TableCell>
                                        {row.amount}
                                    </TableCell>

                                    <TableCell className={`${getStatusColor(row.status)} text-base`}>
                                        {row.status}
                                    </TableCell>

                                    <TableCell>
                                        {moment(row.timestamp).format("DD/MM/YYYY HH:mm")}
                                    </TableCell>

                                    <TableCell className='flex justify-end'>

                                        <WithdrawDialog deposit={row} refetch={fetchHistory}/>

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
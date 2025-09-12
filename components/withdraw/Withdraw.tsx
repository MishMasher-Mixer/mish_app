import { Deposit } from '@/types/types'
import React, { useState, useTransition } from 'react'
import { Dialog, DialogHeader, DialogTrigger } from '../ui/dialog'
import { DialogContent, DialogTitle } from '@radix-ui/react-dialog'
import { Button } from '../ui/button'
import { validateAddress } from '@/lib/validateAddress'
import { toast } from 'sonner'
import axios from 'axios'
import { Loader } from 'lucide-react'

type Props = {
    deposit: Deposit
    refetch?: () => void
}

const WithdrawDialog: React.FC<Props> = ({
    deposit, refetch
}) => {

    const [open, setOpen] = useState<boolean>(false)
    const [address, setAddress] = useState<string>("")
    const [addressError, setAddressError] = useState<string>("")
    const [isWithdrawPending, startWithdraw] = useTransition()

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
                const { data } = await axios.post("/withdraw", {
                    depositId: deposit._id,
                    address
                })

                toast.info("Request sent!")
                if (refetch) {
                    refetch()
                }
                setOpen(false)

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
        <div className='relative'>
            <Button
                variant="secondary"
                size="sm"
                disabled={deposit.withdrawStatus !== "not-available"}
                onClick={() => setOpen(prev => !prev)}
            >
                Withdraw
            </Button>

            {open && <div className='fixed inset-0 bg-black/10 z-10' onClick={() => setOpen(false)}>
            </div>}

            {open && (
                <div className="fixed inset-0 z-20 flex items-center justify-center" onClick={() => setOpen(false)} >
                    <div
                        className="bg-background-subtle rounded-lg shadow-lg p-6 min-w-xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <h2 className="text-lg font-medium mb-4">
                            Withdraw {deposit.amount} {deposit.token}
                        </h2>

                        <div className='flex flex-col gap-3'>
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
                        </div>

                        <div className="flex justify-end gap-2 mt-8">
                            <Button variant="secondary" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="default" onClick={handleWithdraw} disabled={isWithdrawPending || !address}>
                                Confirm
                                {isWithdrawPending && <Loader className='animate-spin' />}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default WithdrawDialog
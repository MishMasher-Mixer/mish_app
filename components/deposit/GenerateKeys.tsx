"use client"

import React, { useState, useTransition } from 'react'
import { Button } from '../ui/button'
import { ArrowRight, ChevronRight, Copy, Download, Eye, EyeOff, Files, Loader, MoveRight } from 'lucide-react'
import { toast } from 'sonner'
import { api } from '@/lib/api'
import axios from 'axios'

const GenerateKeys = () => {

    const [publicKey, setPublicKey] = useState<string>("")
    const [privateKey, setPrivatekey] = useState<string>("")

    const [generated, setGenerated] = useState<boolean>(false)

    const [inputType, setInputType] = useState<"text" | "password">("password")

    const [isPeding, startTransition] = useTransition()

    const toggleInputType = () => {
        setInputType(prev => (prev === "password" ? "text" : "password"))
    }

    const copy = (text: string) => {
        navigator.clipboard.writeText(text)
        toast.info("coppied")
    }

    const downloadKeys = () => {
        const content = `Public Key: ${publicKey}\nPrivate Key: ${privateKey}`
        const blob = new Blob([content], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'credentials.txt'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const handleGenerate = async () => {
        startTransition(async () => {
            try {
                const { data } = await axios.post("/auth/gen-keypair", {})

                setPublicKey(data.data.publicKey)
                setPrivatekey(data.data.privateKey)
                setGenerated(true)
            } catch (error) {
                toast.error("Something went wrong")
            }
        })
    }

    return (
        <div className='flex flex-col bg-background-subtle p-6 gap-6'>
            {!generated && <div className='flex items-center justify-between'>
                <div>
                    <h4 className='text-xl'>
                        Generate account
                    </h4>

                    <p className="text-foreground-muted text-sm">
                        Users which already withdrawed their deposits.
                    </p>
                </div>

                <Button variant={"default"} className="rounded-full cursor-pointer w-max" onClick={handleGenerate} disabled={isPeding}>
                    Generate new key
                    {!isPeding ? <ArrowRight /> :
                        <Loader className='animate-spin' />}
                </Button>
            </div>}

            {generated && <div className='bg-background rounded-xl flex items-end justify-between p-5'>
                <div className='flex flex-col gap-4'>
                    <div className='flex items-center gap-2 text-foreground-subtle'>
                        <span className='font-medium'>
                            Public Key:
                        </span>

                        <span className=''>
                            {publicKey}
                        </span>

                        <button className='text-sm text-foreground/80 cursor-pointer' onClick={() => copy(publicKey)}>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.5 4.5V2.25H15.75V10.5H13.5M2.25 6H12V15.75H2.25V6Z" stroke="#27282B" strokeOpacity="0.6" strokeWidth="1.5" />
                            </svg>

                        </button>
                    </div>

                    <div className='flex items-center gap-2 text-foreground-subtle'>
                        <span className='font-medium'>
                            Private Key:
                        </span>

                        <span
                            className=" whitespace-pre px-1"
                            aria-hidden="true"
                        >
                            {inputType === "password" ? "•".repeat(privateKey.length) : privateKey}
                        </span>


                        <button className='text-sm text-foreground/80 cursor-pointer' onClick={() => copy(privateKey)}>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.5 4.5V2.25H15.75V10.5H13.5M2.25 6H12V15.75H2.25V6Z" stroke="#27282B" strokeOpacity="0.6" strokeWidth="1.5" />
                            </svg>
                        </button>

                        <button className='text-sm text-foreground/80 cursor-pointer' onClick={toggleInputType}>
                            {inputType == "password" ? <Eye className='w-4.5' color='#6e6e7d' /> : <EyeOff className='w-4.5' color='#6e6e7d' />}
                        </button>
                    </div>
                </div>

                <Button variant={"secondary"} className="cursor-pointer hover:bg-muted/50 rounded-full" onClick={downloadKeys}>
                    Download keys
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.00108 3.49738e-07L6.00108 8M6.00108 8L10 4.35903M6.00108 8L2 4.35903M2 11L10 11" stroke="white" strokeWidth="1.5" />
                    </svg>

                </Button>
            </div>}
        </div>
    )
}

export default GenerateKeys
"use client"

import React, { useState, useTransition } from 'react'
import { Button } from '../ui/button'
import { ChevronRight, Copy, Download, Eye, EyeOff, Files, Loader } from 'lucide-react'
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
        <div className='flex flex-col gap-6'>
            <Button variant={"secondary"} className="rounded-full cursor-pointer w-max" onClick={handleGenerate} disabled={isPeding}>
                Generate new key
                {!isPeding ? <ChevronRight /> :
                <Loader className='animate-spin' />}
            </Button>

            {generated && <div className='border rounded-xl flex items-end justify-between p-6'>
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2'>
                        <span className='font-semibold'>
                            Public Key:
                        </span>

                        <span className='text-foreground/80'>
                            {publicKey}
                        </span>

                        <button className='text-sm text-foreground/80 cursor-pointer' onClick={() => copy(publicKey)}>
                            <Files className='w-4.5' color='#6e6e7d' />
                        </button>
                    </div>

                    <div className='flex items-center gap-2'>
                        <span className='font-semibold'>
                            Private Key:
                        </span>

                        <span
                            className=" whitespace-pre px-1"
                            aria-hidden="true"
                        >
                            {inputType === "password" ? "•".repeat(privateKey.length) : privateKey}
                        </span>


                        <button className='text-sm text-foreground/80 cursor-pointer' onClick={() => copy(privateKey)}>
                            <Files className='w-4.5' color='#6e6e7d' />
                        </button>

                        <button className='text-sm text-foreground/80 cursor-pointer' onClick={toggleInputType}>
                            {inputType == "password" ? <Eye className='w-4.5' color='#6e6e7d' /> : <EyeOff className='w-4.5' color='#6e6e7d' />}
                        </button>
                    </div>
                </div>

                <Button variant={"secondary"} className="bg-muted text-foreground cursor-pointer hover:bg-muted/50" onClick={downloadKeys}>
                    <Download />
                    Download keys
                </Button>
            </div>}
        </div>
    )
}

export default GenerateKeys
"use client"

import authService from '@/auth/AuthService'
import { Button } from '@/components/ui/button'
import { ArrowRight, Loader, LogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'


const LoginPage = () => {

    const [publicKey, setPublicKey] = useState<string>("")
    const [privateKey, setPrivateKey] = useState<string>("")

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setIsLoading(true)

            await authService.signIn(
                publicKey, privateKey
            )

            setIsLoading(false)
            router.replace("/")
        } catch (error: any) {
            toast.error(error.message || "something went wrong")
            setIsLoading(false)
        }
    }

    return (
        <section className="py-16">
            <div className="container flex flex-col gap-6">

                <div className="rounded-xl p-6 bg-background-subtle space-y-6">

                    <div className="flex items-center gap-2">
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_286_842)">
                                <circle cx="13" cy="13" r="13" fill="#765BFF" />
                                <g clipPath="url(#clip1_286_842)">
                                    <circle cx="13" cy="10" r="3.25" stroke="white" strokeWidth="1.5" />
                                    <circle cx="13" cy="23" r="6.25" stroke="white" strokeWidth="1.5" />
                                </g>
                            </g>
                            <defs>
                                <clipPath id="clip0_286_842">
                                    <rect width="26" height="26" fill="white" />
                                </clipPath>
                                <clipPath id="clip1_286_842">
                                    <rect width="16" height="16" fill="white" transform="translate(21 21) rotate(180)" />
                                </clipPath>
                            </defs>
                        </svg>

                        <h2 className="capitalize font-medium text-2xl" >
                            Private area
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className='space-y-6 mt-10'>
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="" className="text-foreground-muted font-medium">
                                Public Key
                            </label>

                            <input
                                className="border rounded-md py-3 px-4 text-foreground-subtle"
                                value={publicKey}
                                onChange={(e) => setPublicKey(e.target.value)}
                                required
                                placeholder='Enter Public Key'
                            />
                        </div>

                        <div className='flex flex-col gap-3'>
                            <label htmlFor="" className="text-foreground-muted font-medium">
                                Private Key
                            </label>

                            <input
                                className="border rounded-md py-3 px-4 text-foreground-subtle"
                                type='password'
                                value={privateKey}
                                onChange={(e) => setPrivateKey(e.target.value)}
                                required
                                placeholder='Enter your Private Key'
                            />
                        </div>

                        <Button type='submit' className='mt-2 rounded-full' disabled={isLoading}>
                            Access private area
                            {isLoading ? <Loader className='animate-spin' /> : <ArrowRight />}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default LoginPage

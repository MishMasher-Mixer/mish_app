"use client"

import authService from '@/auth/AuthService'
import { Button } from '@/components/ui/button'
import { Loader, LogIn } from 'lucide-react'
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
        <section className="py-6">
            <div className="container flex flex-col gap-6">

                <div className="rounded-xl p-6 bg-background-subtle space-y-6">

                    <div className="flex items-center gap-2">
                        <LogIn className='text-accent' strokeWidth={4} />
                        <h2 className="uppercase font-medium text-xl" >
                            Private area
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="" className="text-foreground-muted font-medium">
                                Public Key
                            </label>

                            <input
                                className="border rounded-md py-3 px-4 focus:outline-primary outline-1"
                                value={publicKey}
                                onChange={(e) => setPublicKey(e.target.value)}
                                required
                            />
                        </div>

                        <div className='flex flex-col gap-3'>
                            <label htmlFor="" className="text-foreground-muted font-medium">
                                Private Key Key
                            </label>

                            <input
                                className="border rounded-md py-3 px-4 focus:outline-primary outline-1"
                                type='password'
                                value={privateKey}
                                onChange={(e) => setPrivateKey(e.target.value)}
                                required
                            />
                        </div>

                        <Button type='submit' className='mt-4 hover:bg-accent' disabled={isLoading}>
                            Access private area
                            {isLoading && <Loader className='animate-spin' />}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default LoginPage
"use client"

import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { ArrowDown, ArrowRight, ChevronRight, ChevronsDown, ChevronsUp, Hamburger, History, Menu } from 'lucide-react'
import { useAuth } from '@/auth/AuthContext'
import authService from '@/auth/AuthService'
import { useRouter } from 'next/navigation'

const Header = () => {

    const { isAuthenticated } = useAuth()
    const router = useRouter()

    const logout = () => {
        authService.logout()

        router.push('/')
    }

    return (
        <header className='w-full'>
            <div className='container border-b border-muted'>
                <nav className='flex items-center justify-between h-[78px]'>
                    <Link href={"/"} className='flex items-center gap-1.5'>
                        <img src="/assets/images/logo.png" alt="MishMash" className='w-[30px] h-[30px] rounded-full' />

                        <span className='font-matter-sq font-medium text-[22px]'>
                            Mishmasher
                        </span>
                    </Link>

                    <div className='items-center gap-4 hidden sm:flex'>

                        <ul className='flex items-center gap-4 text-sm font-mono font-normal uppercase'>
                            <li>
                                <Link href={"/"} className='flex items-center gap-1.5 hover:text-primary'>
                                    <span>Deposit</span>
                                    <ChevronsDown className='w-[16px] h-[16px]' />
                                </Link>
                            </li>

                            {!isAuthenticated && <li>
                                <Link href={"/anon-withdraw"} className='flex items-center gap-1.5 hover:text-primary'>
                                    <span>Withdraw</span>
                                    <ChevronsUp className='w-[16px] h-[16px]' />
                                </Link>
                            </li>}

                            {isAuthenticated && <li>
                                <Link href={"/history"} className='flex items-center gap-1.5 hover:text-primary'>
                                    <span>History</span>
                                    <History className='w-[16px] h-[16px]' />
                                </Link>
                            </li>}
                        </ul>

                        {!isAuthenticated && <Button className='rounded-full text-xs' asChild>
                            <Link href={"/login"}>
                                Private area
                                <ChevronRight />
                            </Link>
                        </Button>}

                        {isAuthenticated && <Button className='rounded-full text-xs' onClick={logout}>
                            logout
                            <ChevronRight />
                        </Button>}
                    </div>

                    <Button variant={"ghost"} className='sm:hidden'>
                        <Menu className='w-6 h-6' />
                    </Button>
                </nav>
            </div>
        </header>
    )
}

export default Header



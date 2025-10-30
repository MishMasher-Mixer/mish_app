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
            <div className='container border-b border-black/10'>
                <nav className='flex items-center justify-between h-[78px]'>
                    <Link href={"/"} className='flex items-center gap-1.5'>
                        <img src="/assets/images/logo.png" alt="MishMash" className='w-[26px] h-[26px] rounded-full' />

                        <span className='font-matter-sq font-medium text-[22px]'>
                            Mishmasher
                        </span>
                    </Link>

                    <div className='items-center gap-4 hidden sm:flex'>

                        <ul className='flex items-center gap-4 text-sm font-mono font-normal uppercase'>
                            <li>
                                <Link href={"/"} className='flex items-center gap-1.5 hover:text-primary text-sm font-medium'>
                                    <span>Deposit</span>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 2L1.71205 10.2852M1.71205 10.2852H9.71205M1.71205 10.2852V2.28516" stroke="#27282B" strokeOpacity="0.6" strokeWidth="1.5" />
                                    </svg>

                                </Link>
                            </li>

                            {!isAuthenticated && <li>
                                <Link href={"/anon-withdraw"} className='flex items-center gap-1.5 hover:text-primary text-sm font-medium'>
                                    <span>Withdraw</span>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.71204 10.2852L9.99998 2M9.99998 2H1.99998M9.99998 2V10" stroke="#27282B" strokeOpacity="0.6" strokeWidth="1.5" />
                                    </svg>

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
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.5 5.99892H11M11 5.99892L7.58659 2M11 5.99892L7.58659 10M1 3V9" stroke="white" strokeWidth="1.5" />
                                </svg>

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



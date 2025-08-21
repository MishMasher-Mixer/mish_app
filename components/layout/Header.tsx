import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { ArrowDown, ArrowRight, Hamburger, Menu } from 'lucide-react'

const Header = () => {
    return (
        <header className='w-full'>
            <div className='container'>
                <nav className='flex items-center justify-between h-[78px]'>
                    <Link href={"/"} className='flex items-center gap-1.5'>
                        <img src="/assets/images/logo.png" alt="MishMash" className='w-[26px] h-[26px]' />

                        <span className='font-matter-sq font-medium text-[22px]'>
                            Mishmash
                        </span>
                    </Link>

                    <div className='items-center gap-4 hidden sm:flex'>

                        <ul className='flex items-center gap-4 text-xs font-mono font-medium uppercase'> 
                            <li>
                                <Link href={"/"} className='flex items-center gap-1.5 hover:text-primary'>
                                    <span>Learn</span> 
                                    <ArrowDown className='w-[12px] h-[12px]'/>
                                </Link>
                            </li>

                            <li>
                                <Link href={"/"} className='flex items-center gap-1.5 hover:text-primary'>
                                    <span>faq</span> 
                                    <ArrowDown className='w-[12px] h-[12px]'/>
                                </Link>
                            </li>

                            <li>
                                <Link href={"/"} className='flex items-center gap-1.5 hover:text-primary'>
                                    <span>docs</span> 
                                    <ArrowDown className='w-[12px] h-[12px]'/>
                                </Link>
                            </li>
                        </ul>

                        <Button className='rounded-full text-xs' asChild>
                            <Link href={"/"}>
                                Start Mix
                                <ArrowRight />
                            </Link>
                        </Button>
                    </div>

                    <Button variant={"ghost"} className='sm:hidden'>
                        <Menu className='w-6 h-6'/>
                    </Button>
                </nav>
            </div>
        </header>
    )
}

export default Header



import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'



const footerLinks: Record<string, string[]> = {
    "Explore": [
        "wallets",
        "stacking",
        "blog",
        "events",
        "community",
        "brand"
    ],
    "Learn": [
        "sbtc",
        "clarity",
        "proof of transfer",
        "nakamoto"
    ],
    "Build": [
        "guide",
        "tools",
        "whitepaper",
        "resources",
        "jobs"
    ],
    "Social": [
        "X.com",
        "discord",
        "reddit",
        "youtube",
        "forum"
    ],
    "More": [
        "faq",
        "explorer",
        "bounty program",
        "privacy policy",
        "stacks store"
    ]
}


const Footer = () => {
    return (
        <footer className='py-20'>
            <div className='container'>

                <div className='flex flex-col'>
                    
                    <div className='w-[286px] h-[92px] relative flex items-center px-8 sm:px-12'>
                        <svg className='absolute inset-0 z-0 w-full h-full' viewBox="0 0 286 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 12C0 5.37259 5.37258 0 12 0H254C260.627 0 266 5.37258 266 12V92H0V12Z" fill="#F4F3F0" />
                            <path d="M266.004 73C266.201 83.4027 274.597 91.7976 285 91.9951V92H266V73H266.004Z" fill="#F4F3F0" />
                        </svg>

                        <Link href={"/"} className='flex items-center gap-2 z-10'>
                            <img src="/assets/images/logo.png" alt="MishMash" className='w-[32px] h-[32px]' />

                            <span className='font-matter-sq font-medium text-[28px]'>
                                Mishmash
                            </span>
                        </Link>
                    </div>

                    <div className='bg-background-subtle px-8 sm:px-12 py-12 min-h-[400px] rounded-b-[12px] rounded-tr-[12px] flex flex-col gap-8 relative'>

                        <p className='opacity-[64%]'>
                            Dive deeper into Stacks:
                        </p>

                        <div className='flex items-start gap-4 flex-col w-full sm:flex-row sm:items-center'>
                            <Button variant={"secondary"} asChild className='text-xs' size={"lg"}>
                                <Link href={"/"}>
                                    Start Mix
                                    <ArrowRight />
                                </Link>
                            </Button>

                            <Button variant={"default"} asChild className='text-xs bg-muted text-muted-foreground hover:bg-muted/90' size={"lg"}>
                                <Link href={"/"}>
                                    Open docs
                                    <ArrowRight />
                                </Link>
                            </Button>
                        </div>

                        <div className='w-[60%] flex items-start flex-wrap gap-12 mt-8 z-10'>

                            {Object.keys(footerLinks).map((key, i) => (
                                <div key={i} className='max-w-[128px] flex flex-col gap-6'>
                                    <span>
                                        {key}
                                    </span>

                                    <ul className='flex flex-col gap-3'>
                                        {footerLinks[key].map((link, i) => (
                                            <li key={i}>
                                                <Link href={"/"} className='w-full color-[#818688] font-mono uppercase text-xs tracking-[0.3px] opacity-[60%] font-medium whitespace-normal'>
                                                    {link}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}

                        </div>

                        <p className='color-[#818688] text-sm opacity-[60%]'>
                            Mishmash 2025 ©. All rights reserved.
                        </p>

                        <img src="/assets/images/footer-bg.svg" alt="" className='absolute bottom-0 right-0 z-0' />

                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer



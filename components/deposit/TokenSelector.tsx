import { stablecoins, tokens } from '@/lib/tokens'
import { Token } from '@/types/types'
import React, { useState } from 'react'

type Props = {
    currentToken: Token
    setToken: (token: Token) => void
}

const TokenSelector: React.FC<Props> = ({
    currentToken, setToken
}) => {

    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    const toggle = () => setMenuOpen(prev => !prev)

    return (
        <div className='w-full relative'>
            <button className='px-4 h-[44px] flex items-center gap-3 bg-transparent border border-border rounded-[8px] w-full cursor-pointer' onClick={toggle}>
                <img src={`/assets/tokens/${currentToken.symbol.toLowerCase()}.svg`} alt="" className='w-4 h-4' />

                <span>
                    {currentToken.name} ({currentToken.network})
                </span>

                <div className='ml-auto'>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4L6 8L1 4" stroke="#27282B" strokeOpacity="0.6" strokeWidth="1.5" />
                    </svg>

                </div>
            </button>

            {menuOpen && <div className='fixed inset-0 bg-transparent z-10' onClick={toggle}></div>}

            {menuOpen &&
                <div className='absolute bg-background-subtle w-full h-[300px] border rounded-[8px] z-20 overflow-y-auto py-4 px-1 flex flex-col gap-4'>
                    <div className='space-y-2'>
                        {tokens.map((token, i) => (
                            <button key={i} className={`${token.symbol === currentToken.symbol ? "bg-[#dedad4]" : "bg-transparent"} w-full flex items-center justify-between px-3 py-2 hover:bg-[#dedad4] rounded-md`}
                                onClick={() => {
                                    setToken(token)
                                    setMenuOpen(false)
                                }}
                            >
                                <img src={`/assets/tokens/${token.symbol.toLowerCase()}.svg`} alt="" className='w-6 h-6' />

                                <span>
                                    {token.name} ({token.network})
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className='flex flex-col gap-3'>
                        <label htmlFor="" className='text-foreground-muted  ml-3'>
                            Stablecoins
                        </label>

                        <div className='space-y-2'>
                            {stablecoins.map((token, i) => (
                                <button key={i} className={`${token.symbol === currentToken.symbol ? "bg-[#dedad4]" : "bg-transparent"} w-full flex items-center justify-between px-3 py-2 hover:bg-[#dedad4] rounded-md`}
                                    onClick={() => {
                                        setToken(token)
                                        setMenuOpen(false)
                                    }}
                                >
                                    <div className='relative'>
                                        <img src={`/assets/tokens/${token.symbol.toLowerCase()}.svg`} alt="" className='w-6 h-6' />

                                        <img src={`/assets/tokens/${token.network.toLowerCase()}.svg`} alt="" className='w-3 h-3 absolute bottom-0 -right-1' />
                                    </div>

                                    <span>
                                        {token.name} ({token.network})
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default TokenSelector
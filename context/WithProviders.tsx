"use client"

import React, { useState } from 'react'
import axios from 'axios';
import { AuthProvider, useAuth } from '@/auth/AuthContext';
import SocketProvider from '@/providers/SocketProvider';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL + "/api";
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['ngrok-skip-browser-warning'] = '69420';

const WithProviders = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    return (
        <SocketProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </SocketProvider>
    )
}

export default WithProviders
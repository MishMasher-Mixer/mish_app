"use client"

import React, { createContext, useContext } from 'react'
import { io, Socket } from 'socket.io-client'

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8888"

type SocketContextType = [Socket | null, boolean, Error | null]

const SocketContext = createContext<SocketContextType>([null, false, null])

export const useSocket = () => {
    const context = useContext(SocketContext)
    if (context === undefined) {
        throw new Error("useSocket must be used within a SocketProvider")
    }
    return context
}

export default function SocketProvider({ children }: React.PropsWithChildren<{}>) {

    const [socket, setSocket] = React.useState<Socket | null>(null)
    const [isConnected, setIsConnected] = React.useState<boolean>(false)
    const [error, setError] = React.useState<Error | null>(null)


    React.useEffect(() => {
        const initializeSocket = async () => {
            try {
                const socketIo = io(`${SOCKET_URL}`, {
                    reconnection: true,
                    upgrade: true,
                    path: "/socket.io",
                    transports: ["websocket", "polling"],
                })

                setSocket(socketIo)
                setError(null)

                return () => {
                    socketIo.disconnect()
                    setSocket(null)
                    setIsConnected(false)
                }
            } catch (err) {
                setError(err instanceof Error ? err : new Error(String(err)))
                return () => { }
            }
        }

        const cleanup = initializeSocket()

        return () => {
            cleanup.then(cleanupFn => cleanupFn && cleanupFn())
        }
    }, [])


    React.useEffect(() => {
        if (!socket) return

        const onConnect = () => {
            console.log("Socket connected")
            setIsConnected(true)
        }

        const onDisconnect = () => {
            console.log("Socket disconnected")
            setIsConnected(false)
        }

        const onConnectError = (err: Error) => {
            console.error("Socket connection error:", err)
            setError(err)
            setIsConnected(false)
        }

        socket.on("connect", onConnect)
        socket.on("disconnect", onDisconnect)
        socket.on("connect_error", onConnectError)

        return () => {
            socket.off("connect", onConnect)
            socket.off("disconnect", onDisconnect)
            socket.off("connect_error", onConnectError)
        }
    }, [socket])

    return (
        <SocketContext.Provider value={[socket, isConnected, error]}>
            {children}
        </SocketContext.Provider>
    )
}
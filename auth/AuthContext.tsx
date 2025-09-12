import React, { createContext, useContext, useEffect, useState } from 'react';
import authService from './AuthService';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean
}


const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter()

    useEffect(() => {
        authService.on('onAutoLogin', () => {
            // dispatch(showMessage({ message: 'Signing in with JWT' }));
            toast.success("Signing in...")
            /**
             * Sign in and retrieve user data with stored token
             */
            authService
                .signInWithToken()
                .then(() => {
                    success('Signed in');
                })
                .catch((error: AxiosError) => {
                    pass(error.message);
                });
        });

        authService.on('onLogin', () => {
            success('Signed in');
        });

        authService.on('onLogout', () => {
            pass('Signed out');
        });

        authService.on('onAutoLogout', (message: string) => {
            pass(message);
        });

        authService.on('onNoAccessToken', () => {
            pass();
        });

        authService.init();

        function success(message: string) {
            if (message) {
                toast.success(message)
            }

            setLoading(false);
            setIsAuthenticated(true);
        }

        function pass(message?: string) {
            if (message) {
                toast.error(message)
            }

            setLoading(false);
            setIsAuthenticated(false);
        }
    }, []);

    if (loading) return null;

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider');
    }
    return context;
}

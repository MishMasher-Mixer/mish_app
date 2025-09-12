import axios, { AxiosError, AxiosResponse } from "axios"
import { jwtDecode, JwtPayload } from 'jwt-decode'

type EventTypes = 'onLogin' | 'onLogout' | 'onAutoLogin' | 'onAutoLogout' | 'onNoAccessToken' | 'onVerified';

class CustomEmitter {
    private events: Record<string, ((...args: any[]) => void)[]> = {};

    on(event: EventTypes, callback: (...args: any[]) => void) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(callback);
    }

    emit(event: EventTypes, data?: any) {
        this.events[event]?.forEach((cb) => cb(data));
    }

    off(event: EventTypes, callback: (...args: any[]) => void) {
        this.events[event] = this.events[event]?.filter((cb) => cb !== callback) || [];
    }
}

class AuthService extends CustomEmitter {
    init() {
        this.setInterceptors();
        this.handleAuthentication();
    }

    setInterceptors = () => {
        axios.interceptors.response.use(
            (response: AxiosResponse<unknown>) => response,
            (err: AxiosError) =>
                new Promise(() => {
                    if (err?.response?.status === 401 && err.config) {
                        // if you ever get an unauthorized response, logout the user
                        this.emit('onAutoLogout', 'Invalid access_token');
                        _setSession(null);
                    }
                    throw err;
                })
        );
    };

    private async handleAuthentication() {
        const access_token = getAccessToken();

        if (!access_token) {
            this.emit('onNoAccessToken');

            return;
        }

        if (isTokenValid(access_token)) {
            _setSession(access_token);
            this.emit('onAutoLogin', true);
        } else {
            _setSession(null);
            this.emit('onAutoLogout', 'access_token expired');
        }
    }
    /**
     * Signs in with the provided email and password.
     */
    signIn = async (publicKey: string, privateKey: string): Promise<void> => {
        try {
            const {data} = await axios.post(`/auth/login`, {
                publicKey,
                privateKey,
            });

            if (data.success) {
                _setSession(data.data.accessToken);
                this.emit('onLogin');
            } else {
                throw new Error(data.message);
            }
        } catch (err: any) {
            console.log(err);
            throw new Error(err?.response?.data?.message || 'Failed to sign in');
        }
    };

    /**
     * Signs in with the provided provider.
     */
    signInWithToken = () =>
        new Promise((resolve, reject) => {
            axios
                .get(`/auth/refresh`, {
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`
                    }
                })
                .then(
                    (
                        response: AxiosResponse<{
                            data: {
                                accessToken: string
                            };
                            success: boolean;
                            code: string;
                            status: number;
                            errors?: any[];
                            message: string;
                        }>
                    ) => {
                        if (response.data.success) {
                            _setSession(response.data.data.accessToken);
                            resolve(undefined);
                        } else {
                            this.logout();
                            reject(new Error('Failed to login with token.'));
                        }
                    }
                )
                .catch(() => {
                    this.logout();
                    reject(new Error('Failed to login with token.'));
                });
        });

    /**
     * Signs out the user.
     */
    logout = () => {
        _setSession(null);
        this.emit('onLogout', 'Logged out');
    };
}

function _setSession(access_token: string | null) {
    if (access_token) {
        setAccessToken(access_token);
        axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
        removeAccessToken();
        delete axios.defaults.headers.common.Authorization;
    }
}

// Token Utils
function setAccessToken(token: string) {
    localStorage.setItem('access_token', token);
}

function getAccessToken() {
    return localStorage.getItem('access_token');
}

function removeAccessToken() {
    localStorage.removeItem('access_token');
}

function isTokenValid(token: string) {
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.exp && decoded.exp * 1000 > Date.now();
    } catch {
        return false;
    }
}

const authService = new AuthService();
export default authService;

import axios, { AxiosError } from 'axios';

export const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 60000
})

api.interceptors.request.use((config) => {
    console.log('[Request]', `${config.baseURL ?? ''}${config.url ?? ''}`);
    return config;
});

// api.interceptors.response.use(
//     (response) => response,
//     (error: AxiosError<ResponseData<any>>) => {
//         if (error.response) {
//             return Promise.reject({
//                 ...error.response.data,
//                 status: error.response.status
//             });
//         } else if (error.request) {
//             return Promise.reject({
//                 success: false,
//                 message: 'No response from server',
//                 status: 500
//             });
//         } else {
//             return Promise.reject({
//                 success: false,
//                 message: error.message,
//                 status: 500
//             });
//         }
//     }
// )

// export const axiosFetcher = async <T>(url: string): Promise<T> => {
    

//     const { data } = await axios.get<ResponseData<T>>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1${url}`)
    
//     if (data.data === undefined) {
//         throw new Error('Data is undefined');
//     }
//     return data.data;
// }

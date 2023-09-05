import axios from 'axios'
import { reqResolve, reqReject, resResolve, resReject } from './interceptors'

export function createAxios (options = {}) {
    const defautOptions = {
        timeout: 30 * 1000
    }
    const service = axios.create({
        ...defautOptions,
        ...options
    })
    service.interceptors.request.use(reqResolve, reqReject)
    service.interceptors.response.use(resResolve, resReject)
    return service
}

export const request = createAxios({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    needToken: true
})
/* eslint-disable no-undef */
import { getToken } from '@/utils'
import { rejectError } from './errors'

/* 请求处理 */
export function reqResolve (config) {
    if (!config.needToken) return config
    console.log('config', config)
    const token = getToken()
    if (!token) {
        return Promise.reject({
            status: 401,
            redirect: '/login',
            message: '登录已过期，请重新登录！'
        })
    }

    config.header.Authorization = config.headers.Authorization || token

    return config
}

export function reqReject (error) {
    return Promise.reject(error)
}

/* 响应处理 */
export function resResolve (response) {
    const { data, config } = response
    const { code, message } = data
    if (code !== 0) {
        /** 需要错误提醒 */
        const msg = message || rejectError(code)
        !config.notNeedMsg && $message.error(msg)
        return Promise.reject({ code, message: msg, error: data })

    }
    return Promise.resolve(data)
}

export function resReject (error) {
    const { response, message, config, status, redirect } = error

    const code = response?.data?.code || response.code || status

    const msg = response?.data?.message || rejectError(code) || message

    function onClose () {
        if (redirect) {
            location.href = redirect
        }
    }

    !config?.notNeedMsg && $message.error(msg, { onClose })

    return Promise.reject(response?.data || error)

}
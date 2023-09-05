/* eslint-disable no-undef */
import { getToken, request } from '@/utils'
import { rejectError } from './errors'
import { refreshToken } from '@/apis/signup'
/* 请求处理 */
export function reqResolve (config) {
    if (!config.needToken) return config
    const token = getToken()
    if (!token) {
        return Promise.reject({
            status: 401,
            redirect: '/login',
            message: '登录已过期，请重新登录！'
        })
    }
    config.headers.Authorization = token

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

let refreshing = false
let queue = []

export async function resReject (error) {
    let { response, message, config, status, redirect } = error

    const code = response?.data?.code || response.code || status

    // 刷新token时, 处理队列
    if (refreshing) {
        return new Promise(reslove => {
            queue.push({
                config,
                reslove
            })
        })
    }

    // access_token过期, 刷新token
    if (code == 401) {
        refreshing = true

        const res = await refreshToken()
        if (res) {
            queue.forEach(({ config, reslove }) => {
                reslove(request(config))
            })
            return request(config)
        } else {
            // refresh_token过期, 则返回登录
            queue = []
            refreshing = false
            redirect = '/login'
        }
    }
    const msg = response?.data?.message || rejectError(code) || message

    if (!config?.notNeedMsg) {
        $message.error(msg, {
            onClose: () => {
                if (redirect) {
                    location.href = redirect
                }
            }
        })
    }

    return Promise.reject(response?.data || error)

}
import { request } from '@/utils'

export function login (data) {
    return request({
        url: '/login',
        method: 'post',
        data,
        needToken: false
    })
}
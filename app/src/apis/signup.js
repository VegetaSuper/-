import { request, setToken, lStorage } from '@/utils'

//* 登录
export function login (data) {
    return request({
        url: '/login',
        method: 'post',
        data,
        needToken: false
    })
}

//* 刷新token
export function refreshToken () {
    return new Promise((reslove) => {
        request({
            url: '/refresh',
            method: 'get',
            needToken: false,
            params: {
                token: lStorage.get('refresh_token')
            }
        }).then(res => {
            if (res.data && res.data.accessToken) {
                const { accessToken, refreshToken } = res.data
                setToken(accessToken)
                lStorage.set('refresh_token', refreshToken)
                reslove(true)
            } else {
                reslove(false)
            }
        })
    })

}

//* 获取userinfo
export function getProfile () {
    return request({
        url: '/getProfile',
        method: 'get'
    })
}

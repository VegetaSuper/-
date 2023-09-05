import { create } from 'zustand'
import { login, getProfile } from '@/apis/signup'
import { lStorage, setToken } from '@/utils'

export const useUserStore = create((set) => ({
    userInfo: 0,
    userlogin: (form) => set(async () => {
        const res = await login(form)
        const { message, data } = res
        setToken(data.accessToken)
        lStorage.set('refresh_token', data.refreshToken)
        window.$message.success(message)

        const user = await getProfile()
        location.href = '/app'
        return ({ userInfo: user.data })
    })
}))

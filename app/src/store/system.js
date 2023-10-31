import { create } from 'zustand'
import { persist } from 'zustand/middleware'

let store = (set, get) => ({
    // 主题模式 1-跟随系统、2-浅色、3-深色
    themeMode: 1,
    // 设置模式
    setThemeMode: themeMode => set({ themeMode }),
    // 获取系统主题
    getSystemTheme: dark => {
        if (get().themeMode === 1) {
            window
                .matchMedia('(prefers-color-scheme: dark)')
                .addEventListener('change', event => {
                    set({ dark: event.matches })
                })
        }
    },

    // 深色
    dark: false,
    setDark: dark => set({ dark })
})

store = persist(store, { name: 'store-system' })

export const useSystemStore = create(store)

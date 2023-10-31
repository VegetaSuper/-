'use client'
import { useEffect, useMemo } from 'react'
import './globals.css'

import { useSystemStore } from '@/store/system'

export default function RootLayout({ children }) {
    const dark = useSystemStore(state => state.dark)
    const getSystemTheme = useSystemStore(state => state.getSystemTheme)
    const isDark = useMemo(() => dark, [dark])
    useEffect(() => {
        getSystemTheme()
    }, [])
    return (
        <html className={`${isDark ? 'dark' : ''}`}>
            <body className="bg-white text-[#333] dark:bg-[#0a0a0a] dark:text-white">
                {children}
            </body>
        </html>
    )
}


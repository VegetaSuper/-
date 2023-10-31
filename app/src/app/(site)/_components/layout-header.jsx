// 'use client'
import Link from 'next/link'
import Image from 'next/image'

export default function LayoutHeader() {
    return (
        <header className="flex items-center h-[4.5rem] px-8">
            <Link className="logo" href="/explore">
                <Image
                    priority={true}
                    src="/images/logo.png"
                    alt="logo"
                    width="67"
                    height="24"
                />
            </Link>
            <div></div>
        </header>
    )
}

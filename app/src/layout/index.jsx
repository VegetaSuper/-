import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import './index.scss'
import ResizeBox from '@/components/ResizeBox'

import NavBar from './NavBar'

export default function Layout () {

    useEffect(() => {


    }, [])

    return (
        <div className='flex w-screen h-screen overflow-x-hidden'>
            <NavBar />
            {/* <ResizeBox defaultWidth="200">
                <div>center</div>
            </ResizeBox> */}
            <div>
                <Outlet />
            </div>
        </div>
    )
}


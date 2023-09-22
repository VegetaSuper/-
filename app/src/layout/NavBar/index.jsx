import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import Tooltip from '@mui/material/Tooltip'
import Fade from '@mui/material/Fade'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch'
import NotificationsIcon from '@mui/icons-material/Notifications'
import HelpIcon from '@mui/icons-material/Help'

export default function NavBar () {
    const [current, setCurrent] = useState('task')
    const navigate = useNavigate()
    const location = useLocation()


    useEffect(() => {
        console.log('location', location)
    }, [location])
    const list = [
        {
            title: '任务',
            key: 'task',
            render: <CheckBoxIcon />,
            click: () => {
                setCurrent('task')
                navigate('/app/all/task')
            }
        },
        {
            title: '日历视图',
            key: 'calendar',
            render: <CalendarMonthIcon />,
            click: () => {
                setCurrent('calendar')
                navigate('/app/calendar')
            }
        },
        {
            title: '搜索',
            key: 'search',
            render: <ContentPasteSearchIcon />,
            click: () => {
                console.log('触发搜索')
            }
        },
        {
            title: '通知',
            key: 'notice',
            class: 'mt-auto',
            render: <NotificationsIcon />,
            click: () => {
                console.log('触发通知')
            }
        },
        {
            title: '更多',
            key: 'more',
            render: <HelpIcon />,
            click: () => {
                console.log('触发更多')
            }
        }
    ]

    return <ul className='bg-[#f1f4ff] w-[50px] pb-[28px] flex flex-col items-center'>
        {list.map(item => {
            return <li key={item.key} className={`cursor-pointer text-center w-[40px] h-[40px] text-[24px] ${item.class} ${current == item.key ? 'text-[#4772fa] hover:text-[#4772fa]' : 'text-[#9b9ca3] hover:text-[#6f7175]'}`} onClick={item.click}>
                <Tooltip title={item.title} placement="right" TransitionComponent={Fade} enterDelay={300}>
                    {item.render}
                </Tooltip>
            </li>
        })}
    </ul>
}
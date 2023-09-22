import { Suspense, lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RequireAuth } from './guard.jsx'

import HomePage from '@/pages/index.jsx'
import Layout from '@/layout'

const TaskPage = lazy(() => import('@/pages/Task'))
const CalendarPage = lazy(() => import('@/pages/Calendar'))
const LoginPage = lazy(() => import('@/pages/login'))
const ErrorPage = lazy(() => import('@/pages/error'))
import Loading from '@/components/Loading'

const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<Loading />}>
                        <HomePage />
                    </Suspense>
                ),
            },
            {
                path: '/app',
                redirect: '/app/:id/task',
                element: (
                    <Suspense fallback={<Loading />}>
                        <RequireAuth>
                            <Layout />
                        </RequireAuth>
                    </Suspense>
                ),
                children: [
                    {
                        path: '/app/:id/task',
                        element: <TaskPage title="任务" />,
                    },
                    {
                        path: '/app/calendar',
                        element: <CalendarPage title="日历" />
                    }
                ]
            },
        ],
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '*',
        element: <ErrorPage />,
    },
])

export default router
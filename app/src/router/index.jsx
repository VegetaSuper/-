import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RequireAuth } from './guard.jsx'

import HomePage from '@/pages/index.jsx'
import ProtectedPage from '@/pages/ProtectedPage'
import LoginPage from '@/pages/login/index.jsx'
import ErrorPage from '@/pages/error'

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
                path: 'app',
                element: (
                    <Suspense fallback={<Loading />}>
                        <RequireAuth>
                            <ProtectedPage />
                        </RequireAuth>
                    </Suspense>
                ),
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
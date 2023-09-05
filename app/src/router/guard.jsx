import { Navigate, useLocation } from 'react-router-dom'
import { getToken } from '@/utils'

// eslint-disable-next-line react/prop-types
export function RequireAuth ({ children }) {
    const location = useLocation()
    if (!getToken()) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children
}
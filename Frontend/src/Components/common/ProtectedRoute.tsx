import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../store/AuthContext'
import { UserRole } from '../../store/AuthContext'

interface ProtectedRouteProps {
    children?: React.ReactNode
    requiredRole?: UserRole
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    const { user, isLoading } = useAuth()

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Chargement...</div>
    }

    // Not authenticated
    if (!user) {
        return <Navigate to="/login" replace />
    }

    // Check role if required
    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/unauthorized" replace />
    }

    // If there are children, return them, otherwise return the outlet
    return children ? <>{children}</> : <Outlet />
}

export default ProtectedRoute
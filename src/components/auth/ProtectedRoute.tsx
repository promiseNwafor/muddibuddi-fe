import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '@/hooks/useApp'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation()
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute

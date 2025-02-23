import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '@/hooks/useApp'
import { useGetUserQuery } from '@/services/user/userQuery'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation()
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated)
  const { isLoading, error } = useGetUserQuery()

  console.log('++++++++++++++', error)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute

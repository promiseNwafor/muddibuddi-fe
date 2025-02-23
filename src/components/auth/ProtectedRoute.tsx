import { Navigate, useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import { useAppSelector } from '@/hooks/useApp'
import { useGetUserQuery } from '@/services/user/userQuery'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation()
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated)
  const { isLoading, error, isError } = useGetUserQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return toast.error(`Something went wrong ${error}`)
  }

  if (!isAuthenticated && isError) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute

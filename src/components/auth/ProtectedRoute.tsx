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
  const { isLoading, error } = useGetUserQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    toast.error(`Something went wrong! ${error.error}`)
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute

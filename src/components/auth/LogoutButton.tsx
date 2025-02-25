import { logout } from '@/services/user/userSlice'
import { Button } from '../ui/button'

interface LogoutButtonProps {
  children?: React.ReactNode
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    logout()
  }

  return (
    <Button onClick={onClick} variant="ghost" className="cursor-pointer">
      {children}
    </Button>
  )
}

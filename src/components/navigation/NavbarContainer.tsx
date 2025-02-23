import { RxAvatar } from 'react-icons/rx'
import { useGetUserQuery } from '@/services/user/userQuery'

const NavbarContainer = () => {
  const { data: user } = useGetUserQuery()

  return (
    <nav className="border-b border-white/25 p-4 lg:px-10 shadow-md">
      <div className="flex justify-between items-center">
        <p className="text-white md:text-2xl font-medium relative left-10 lg:left-0">
          Hi {user?.username}
        </p>

        <div className="flex items-center space-x-4">
          <RxAvatar size={40} />
          <span className="text-gray-300">{user?.email}</span>
        </div>
      </div>
    </nav>
  )
}

export default NavbarContainer

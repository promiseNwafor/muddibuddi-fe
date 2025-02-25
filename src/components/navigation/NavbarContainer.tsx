import { RxAvatar } from 'react-icons/rx'

const NavbarContainer = () => {
  return (
    <nav className="border-b border-white/25 p-4 shadow-md">
      <div className="flex justify-between items-center">
        <p className="text-white md:text-2xl font-bold relative left-10 lg:left-0">
          Welcome
        </p>

        <div className="flex items-center space-x-4">
          <RxAvatar size={40} />
          <span className="text-gray-300">User Name</span>
        </div>
      </div>
    </nav>
  )
}

export default NavbarContainer

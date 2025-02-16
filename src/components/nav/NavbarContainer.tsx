import { Link } from 'react-router-dom'
import { RxAvatar } from 'react-icons/rx'

const NavbarContainer = () => {
  return (
    <nav className="border-b border-white/25 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          MoodBuddi
        </Link>

        <div className="flex items-center space-x-4">
          <RxAvatar size={40} />
          <span className="text-gray-300">User Name</span>
        </div>
      </div>
    </nav>
  )
}

export default NavbarContainer

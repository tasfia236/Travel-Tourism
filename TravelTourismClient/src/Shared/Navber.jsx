import { IoPersonOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.jpeg'
import { useContext } from 'react'
import { AuthContext } from '../Providers/AuthProviders'

const Navber = () => {
  const { user, logOut } = useContext(AuthContext) || {}

  const handleLogOut = () => {
    logOut().catch(error => console.log(error))
  }

  const navLinks = (
    <>
      {[
        { path: '/', label: 'Home' },
        { path: '/allpackages', label: 'Packages' },
        { path: '/blog-page', label: 'Blogs' },
        { path: '/about Us', label: 'About Us' },
        { path: '/contact', label: 'Contact Us' }
      ].map(({ path, label }) => (
        <li key={path}>
          <Link
            to={path}
            className='group inline-block relative px-4 py-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-800 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent font-bold text-gray-800 hover:text-sky-700 transition-all duration-200'
          >
            <span className='z-10 relative'>{label}</span>
            <span className='bottom-0 left-1/2 group-hover:left-0 absolute bg-sky-700 w-0 group-hover:w-full h-[2px] transition-all'></span>
          </Link>
        </li>
      ))}
    </>
  )

  return (
    <nav className="z-50 fixed bg-white/10 shadow-sm backdrop-blur-md border-white/20 border-b w-full">
 <div className='mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo + Mobile Toggle */}
          <div className='flex items-center gap-3'>
            <img
              src={logo}
              alt='Logo'
              className='shadow-lg rounded-full w-10 h-10'
            />
            <div className='lg:hidden dropdown'>
              <button tabIndex={0} className='text-white btn btn-ghost btn-sm'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
              <ul
                tabIndex={0}
                className='space-y-2 bg-white/90 shadow-xl backdrop-blur-lg mt-2 p-4 rounded-xl w-52 text-black animate-fade-in dropdown-content'
              >
                {navLinks}
              </ul>
            </div>
          </div>

          {/* Center Nav */}
          <ul className='hidden lg:flex items-center gap-8 font-medium text-sm uppercase'>
            {navLinks}
          </ul>

          {/* Auth Buttons / Profile */}
          <div className='flex items-center gap-4'>
            {user ? (
              <div className='dropdown dropdown-end'>
                <div
                  tabIndex={0}
                  role='button'
                  className='btn btn-circle btn-ghost avatar'
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      className='shadow rounded-full w-10 h-10 object-cover'
                      alt='User'
                    />
                  ) : (
                    <div className='flex justify-center items-center bg-white rounded-full w-10 h-10 text-gray-700'>
                      <IoPersonOutline size={24} />
                    </div>
                  )}
                </div>
                <ul
                  tabIndex={0}
                  className='space-y-2 bg-white/95 shadow-xl backdrop-blur-lg mt-3 p-4 rounded-lg w-56 text-sm dropdown-content'
                >
                  <li className='font-bold text-gray-700'>
                    {user.displayName}
                  </li>
                  <li className='text-gray-500'>{user.email}</li>
                  <li>
                    <Link
                      to='/dashboard/profile'
                      className='font-medium text-blue-600 hover:underline'
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogOut}
                      className='hover:bg-red-100 px-2 py-1 rounded w-full font-medium text-red-600 text-left transition'
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link to='/login'>
                  <button className='bg-sky-700 hover:bg-sky-800 text-white transition btn btn-sm'>
                    Sign In
                  </button>
                </Link>
                <Link to='/signup'>
                  <button className='bg-gradient-to-r from-pink-500 to-rose-600 shadow-md hover:brightness-110 text-white hover:scale-105 transition btn btn-sm'>
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navber

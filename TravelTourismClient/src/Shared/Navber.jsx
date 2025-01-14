import { IoPersonOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.jpeg'
import { useContext } from 'react'
import { AuthContext } from '../Providers/AuthProviders'

const Navber = () => {
  const { user, logOut } = useContext(AuthContext) || {}

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch(error => console.log(error))
  }

  const NavList = (
    <>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/allpackages'>Packages</Link>
      </li>
      <li>
        <Link to='/blogs'>Blogs</Link>
      </li>
      <li>
        <Link to='/about Us'>About Us</Link>
      </li>
      <li>
        <Link to='/contact Us'>Contact Us</Link>
      </li>
    </>
  )

  return (
    <div className='z-10 fixed bg-base-100 bg-opacity-15 w-full text-black navbar'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='lg:hidden btn btn-ghost'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='z-[1] bg-base-100 shadow mt-3 p-2 rounded-box w-52 dropdown-content menu menu-sm'
          >
            {NavList}
          </ul>
        </div>
        <img className='px-2 w-20' src={logo} alt='' />
      </div>
      <div className='lg:flex hidden navbar-center'>
        <ul className='px-1 menu menu-horizontal'>{NavList}</ul>
      </div>
      <div className='gap-2 navbar-end'>
        <div className='lg:flex items-center navbar-center'>
          <div className='flex items-center dropdown dropdown-end'>
            {user && (
              <>
                <div
                  tabIndex={0}
                  role='button'
                  className='z-[9999] avatar btn btn-circle btn-ghost'
                >
                  {user.photoURL ? (
                    <div className='rounded-full w-10'>
                      <img
                        alt='Tailwind CSS Navbar component'
                        src={user.photoURL}
                      />
                    </div>
                  ) : (
                    <div className='pt-3 pl-3 rounded-full w-10'>
                      <IoPersonOutline></IoPersonOutline>
                    </div>
                  )}
                </div>
              </>
            )}
            <ul
              tabIndex={0}
              className='z-[9999] fixed bg-base-100 shadow mt-36 p-2 rounded-box w-52 dropdown-content menu menu-sm'
            >
              {user && (
                <>
                  <li className='pl-3 font-bold text-lg'>{user.displayName}</li>
                  <li className='pl-3'>{user.email}</li>
                  <li className='py-2 font-bold text-2xl'>
                    <Link to='/dashboard/profile'>Dashboard</Link>
                  </li>
                </>
              )}
            </ul>
            <ul className='px-1 menu menu-horizontal'>
              {user && (
                <>
                  <li>
                    <a onClick={handleLogOut}>Logout</a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className='flex gap-3'>
          {!user && (
            <>
              <Link to='/login'>
                <button className='btn btn-sm'>Sign In</button>
              </Link>
              <Link to='/signup'>
                <button className='bg-red-600 text-white btn btn-sm'>
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navber

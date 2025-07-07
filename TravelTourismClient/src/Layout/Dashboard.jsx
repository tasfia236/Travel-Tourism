import {
  FaHome,
  FaUtensils,
  FaUsers,
  FaList,
  FaHeart,
  FaPlus,
  FaEnvelope
} from 'react-icons/fa'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { NavLink, Outlet } from 'react-router-dom'
import useAdmin from '../hooks/useAdmin'
import useTourGuide from '../hooks/useTourGuide'
import useUser from '../hooks/useUser'
import { useContext } from 'react'
import { AuthContext } from '../Providers/AuthProviders'

const Dashboard = () => {
  const [isAdmin] = useAdmin()
  const [isTourGuide] = useTourGuide()
  const [isUser] = useUser()

  const { logOut } = useContext(AuthContext) || {}

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch(error => console.log(error))
  }

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
      isActive
        ? 'bg-gradient-to-r from-sky-600 to-cyan-500 text-white shadow-md'
        : 'text-gray-700 hover:bg-sky-100 hover:text-sky-700'
    }`

  const adminLinks = (
    <>
      <li>
        <NavLink to='/dashboard/profile' className={navLinkClass}>
          <FaHome /> Admin Profile
        </NavLink>
      </li>
      <li>
        <NavLink to='/dashboard/addPackage' className={navLinkClass}>
          <FaUtensils /> Add Package
        </NavLink>
      </li>
      <li>
        <NavLink to='/dashboard/manageUsers' className={navLinkClass}>
          <FaUsers /> Manage Users
        </NavLink>
      </li>
    </>
  )

  const tourGuideLinks = (
    <>
      <li>
        <NavLink to='/dashboard/profile' className={navLinkClass}>
          <FaHome /> Guide Profile
        </NavLink>
      </li>
      <li>
        <NavLink to='/dashboard/assign' className={navLinkClass}>
          <FaList /> My Assigned Tours
        </NavLink>
      </li>
    </>
  )

  const userLinks = (
    <>
      <li>
        <NavLink to='/dashboard/profile' className={navLinkClass}>
          <FaHome /> User Profile
        </NavLink>
      </li>
      <li>
        <NavLink to='/dashboard/mybooking' className={navLinkClass}>
          <FaList /> My Bookings
        </NavLink>
      </li>
      <li>
        <NavLink to='/dashboard/mywishlist' className={navLinkClass}>
          <FaHeart /> My Wishlist
        </NavLink>
      </li>
      <li>
        <NavLink to='/dashboard/requestAdmin' className={navLinkClass}>
          <FaPlus /> Request to Admin
        </NavLink>
      </li>
    </>
  )

  let links
  if (isAdmin) links = adminLinks
  else if (isTourGuide) links = tourGuideLinks
  else if (isUser) links = userLinks

  return (
    <div className='drawer lg:drawer-open'>
      <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
      <div className='flex flex-col bg-gradient-to-br from-white via-sky-50 to-cyan-50 min-h-screen drawer-content'>
        {/* Top Navbar */}
        <div className='flex justify-between items-center bg-white/60 shadow-sm backdrop-blur px-6 py-4 border-white/30 border-b w-full'>
          <label
            htmlFor='my-drawer-3'
            className='lg:hidden btn btn-ghost drawer-button'
          >
            ☰
          </label>
          <h2 className='font-semibold text-sky-700 text-xl'>Dashboard</h2>
        </div>

        {/* Main Content */}
        <div className='flex-grow p-6 lg:p-10'>
          <div className='bg-white/70 shadow-lg backdrop-blur border border-white/30 rounded-xl glass'>
            <Outlet />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className='z-50 drawer-side'>
        <label htmlFor='my-drawer-3' className='drawer-overlay'></label>
        <ul className='space-y-2 bg-white/70 backdrop-blur-lg p-6 border-white/30 border-r w-72 min-h-full menu'>
          <h2 className='mb-4 font-bold text-sky-600 text-xl'>User Panel</h2>

          {links}

          <div className='divider' />

          <li>
            <NavLink to='/' className={navLinkClass}>
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/order/contact' className={navLinkClass}>
              <FaEnvelope /> Contact
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleLogOut} to='/'>
              <RiLogoutBoxLine />
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Dashboard

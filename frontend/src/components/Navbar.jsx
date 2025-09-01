import { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]'>
      <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="" />

      {/* Desktop Menu */}
      <ul className='md:flex items-start gap-5 font-medium hidden'>
        <NavLink to='/'><li className='py-1'>HOME</li></NavLink>
        <NavLink to='/doctors'><li className='py-1'>ALL DOCTORS</li></NavLink>
        <NavLink to='/about'><li className='py-1'>ABOUT</li></NavLink>
        <NavLink to='/contact'><li className='py-1'>CONTACT</li></NavLink>
        <li>
          <a
            href={import.meta.env.VITE_ADMIN_PANEL_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='border border-slate-200 px-3 py-2 rounded-full hover:bg-black hover:text-white transition duration-200 text-xs'
          >
            Admin Panel
          </a>
        </li>
      </ul>

      {/* Right Side (Desktop + Mobile) */}
      <div className='flex items-center gap-4 '>
        {
          token && userData ? (
            <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-8 rounded-full' src={userData.image} alt="" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4'>
                  <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                  <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                  <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
          ) : (
            // show login button for both desktop & mobile
            <button
              onClick={() => navigate('/login')}
              className='bg-primary text-white px-6 py-2 rounded-full font-light'
            >
              Create account
            </button>
          )
        }

        {/* Mobile Hamburger */}
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

        {/* ---- Mobile Menu ---- */}
        <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img src={assets.logo} className='w-36' alt="" />
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7' alt="" />
          </div>

          <ul className='flex flex-col items-center gap-4 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p>HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p>ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about'><p>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact'><p>CONTACT</p></NavLink>
            <a onClick={() => setShowMenu(false)} href={import.meta.env.VITE_ADMIN_PANEL_URL}>Admin Panel</a>

            {/* ✅ Added Login / Logout option inside mobile menu */}
            {token && userData ? (
              <>
                <NavLink onClick={() => setShowMenu(false)} to='/my-profile'><p>My Profile</p></NavLink>
                <NavLink onClick={() => setShowMenu(false)} to='/my-appointments'><p>My Appointments</p></NavLink>
                <p onClick={() => { logout(); setShowMenu(false); }} className='cursor-pointer'>Logout</p>
              </>
            ) : (
              <button
                onClick={() => { navigate('/login'); setShowMenu(false); }}
                className='bg-primary text-white px-6 py-2 rounded-full'
              >
                Create account
              </button>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
import React, { useContext, useState } from 'react'
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
    <div className='flex items-center justify-between text-sm py-5 mb-8 border-b border-slate-200 bg-white sticky top-0 z-50 px-2 sm:px-0'>
      <img onClick={() => navigate('/')} className='w-40 cursor-pointer hover:opacity-90 transition-opacity' src={assets.logo} alt="DockRx Logo" />
      <ul className='md:flex items-center gap-8 font-medium hidden text-slate-600'>
        <NavLink to='/' className='relative group'>
          <li className='py-1 hover:text-primary transition-colors'>HOME</li>
          <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-[.active]:w-full'></span>
        </NavLink>
        <NavLink to='/doctors' className='relative group'>
          <li className='py-1 hover:text-primary transition-colors'>ALL DOCTORS</li>
          <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-[.active]:w-full'></span>
        </NavLink>
        <NavLink to='/about' className='relative group'>
          <li className='py-1 hover:text-primary transition-colors'>ABOUT</li>
          <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-[.active]:w-full'></span>
        </NavLink>
        <NavLink to='/contact' className='relative group'>
          <li className='py-1 hover:text-primary transition-colors'>CONTACT</li>
          <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-[.active]:w-full'></span>
        </NavLink>
      </ul>

      <div className='flex items-center gap-4 '>
        {
          token && userData
            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
              <div className='w-9 h-9 rounded-full overflow-hidden border border-slate-200'>
                <img className='w-full h-full object-cover' src={userData.image} alt="User Profile" />
              </div>
              <img className='w-2.5 opacity-50' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-full right-0 pt-3 text-base font-medium text-slate-600 z-20 hidden group-hover:block'>
                <div className='min-w-56 bg-white rounded-lg shadow-xl border border-slate-100 flex flex-col overflow-hidden'>
                  <p onClick={() => navigate('/my-profile')} className='px-5 py-3 hover:bg-slate-50 hover:text-primary cursor-pointer border-b border-slate-50 transition-colors'>My Profile</p>
                  <p onClick={() => navigate('/my-appointments')} className='px-5 py-3 hover:bg-slate-50 hover:text-primary cursor-pointer border-b border-slate-50 transition-colors'>My Appointments</p>
                  <p onClick={logout} className='px-5 py-3 hover:bg-slate-50 hover:text-red-600 cursor-pointer transition-colors'>Logout</p>
                </div>
              </div>
            </div>
            : <button onClick={() => navigate('/login')} className='bg-primary text-white px-7 py-2.5 rounded-lg font-medium shadow-sm hover:bg-blue-700 transition-all active:scale-95 hidden md:block'>Create account</button>
        }
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} alt="" />

        {/* ---- Mobile Menu ---- */}
        <div className={`md:hidden ${showMenu ? 'fixed inset-0 w-full h-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-50 overflow-hidden bg-white transition-all duration-300`}>
          <div className='flex items-center justify-between px-6 py-6 border-b'>
            <img src={assets.logo} className='w-36' alt="" />
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-6 cursor-pointer' alt="" />
          </div>
          <ul className='flex flex-col items-center gap-4 mt-8 px-6 text-lg font-medium text-slate-700'>
            <NavLink onClick={() => setShowMenu(false)} to='/' className='w-full text-center py-3 rounded-lg active:bg-slate-50'><p>HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors' className='w-full text-center py-3 rounded-lg active:bg-slate-50'><p>ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about' className='w-full text-center py-3 rounded-lg active:bg-slate-50'><p>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact' className='w-full text-center py-3 rounded-lg active:bg-slate-50'><p>CONTACT</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
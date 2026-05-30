import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <div className='flex justify-between items-center px-6 sm:px-10 py-4 border-b bg-white sticky top-0 z-50'>
      <div className='flex items-center gap-3 text-xs'>
        <img onClick={() => navigate('/')} className='w-40 sm:w-44 cursor-pointer hover:opacity-90 transition-opacity' src={assets.admin_logo} alt="Admin Logo" />
        <p className='border px-2.5 py-1 rounded-full border-slate-300 text-slate-500 font-medium tracking-wide bg-slate-50 uppercase'>{aToken ? 'Admin Panel' : 'Doctor Panel'}</p>
      </div>
      <button onClick={() => logout()} className='bg-primary text-white text-sm px-8 py-2.5 rounded-lg font-semibold shadow-sm hover:bg-blue-700 transition-all active:scale-95'>Logout</button>
    </div>
  )
}

export default Navbar
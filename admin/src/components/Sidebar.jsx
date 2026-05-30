import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'

const Sidebar = () => {

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  return (
    <div className='min-h-screen bg-white border-r border-slate-200 w-16 md:w-72 transition-all duration-300 shrink-0'>
      {aToken && <ul className='text-slate-600 mt-6 flex flex-col gap-1'>

        <NavLink to={'/admin-dashboard'} className={({ isActive }) => `flex items-center gap-3 py-4 px-5 md:px-8 cursor-pointer transition-all ${isActive ? 'bg-slate-50 text-primary border-r-4 border-primary font-semibold' : 'hover:bg-slate-50 hover:text-slate-900'}`}>
          <img className='w-5 h-5 opacity-70 group-[.active]:opacity-100' src={assets.home_icon} alt='' />
          <p className='hidden md:block'>Dashboard Overview</p>
        </NavLink>
        <NavLink to={'/all-appointments'} className={({ isActive }) => `group flex items-center gap-3 py-4 px-5 md:px-8 cursor-pointer transition-all ${isActive ? 'bg-slate-50 text-primary border-r-4 border-primary font-semibold' : 'hover:bg-slate-50 hover:text-slate-900'}`}>
          <img className='w-5 h-5 opacity-70 group-[.active]:opacity-100' src={assets.appointment_icon} alt='' />
          <p className='hidden md:block'>Appointments List</p>
        </NavLink>
        <NavLink to={'/add-doctor'} className={({ isActive }) => `group flex items-center gap-3 py-4 px-5 md:px-8 cursor-pointer transition-all ${isActive ? 'bg-slate-50 text-primary border-r-4 border-primary font-semibold' : 'hover:bg-slate-50 hover:text-slate-900'}`}>
          <img className='w-5 h-5 opacity-70 group-[.active]:opacity-100' src={assets.add_icon} alt='' />
          <p className='hidden md:block'>Add New Doctor</p>
        </NavLink>
        <NavLink to={'/doctor-list'} className={({ isActive }) => `group flex items-center gap-3 py-4 px-5 md:px-8 cursor-pointer transition-all ${isActive ? 'bg-slate-50 text-primary border-r-4 border-primary font-semibold' : 'hover:bg-slate-50 hover:text-slate-900'}`}>
          <img className='w-5 h-5 opacity-70 group-[.active]:opacity-100' src={assets.people_icon} alt='' />
          <p className='hidden md:block'>Doctors Management</p>
        </NavLink>
      </ul>}

      {dToken && <ul className='text-slate-600 mt-6 flex flex-col gap-1'>
        <NavLink to={'/doctor-dashboard'} className={({ isActive }) => `group flex items-center gap-3 py-4 px-5 md:px-8 cursor-pointer transition-all ${isActive ? 'bg-slate-50 text-primary border-r-4 border-primary font-semibold' : 'hover:bg-slate-50 hover:text-slate-900'}`}>
          <img className='w-5 h-5 opacity-70' src={assets.home_icon} alt='' />
          <p className='hidden md:block'>Panel Dashboard</p>
        </NavLink>
        <NavLink to={'/doctor-appointments'} className={({ isActive }) => `group flex items-center gap-3 py-4 px-5 md:px-8 cursor-pointer transition-all ${isActive ? 'bg-slate-50 text-primary border-r-4 border-primary font-semibold' : 'hover:bg-slate-50 hover:text-slate-900'}`}>
          <img className='w-5 h-5 opacity-70' src={assets.appointment_icon} alt='' />
          <p className='hidden md:block'>My Appointments</p>
        </NavLink>
        <NavLink to={'/doctor-profile'} className={({ isActive }) => `group flex items-center gap-3 py-4 px-5 md:px-8 cursor-pointer transition-all ${isActive ? 'bg-slate-50 text-primary border-r-4 border-primary font-semibold' : 'hover:bg-slate-50 hover:text-slate-900'}`}>
          <img className='w-5 h-5 opacity-70' src={assets.people_icon} alt='' />
          <p className='hidden md:block'>My Profile Settings</p>
        </NavLink>
      </ul>}
    </div>
  )
}

export default Sidebar
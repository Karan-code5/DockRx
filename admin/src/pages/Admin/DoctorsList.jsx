import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, changeAvailability , aToken , getAllDoctors} = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
        getAllDoctors()
    }
}, [aToken])

  return (
    <div className='m-6 w-full max-w-7xl'>
      <h1 className='text-2xl font-bold text-slate-800 mb-6'>Doctors Management</h1>
      <div className='w-full grid grid-cols-auto gap-6 gap-y-10 pt-4'>
        {doctors.map((item, index) => (
          <div className='bg-white border border-slate-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:border-primary/30 transition-all duration-300 group flex flex-col' key={index}>
            <div className='aspect-square overflow-hidden bg-slate-50 relative'>
              <img className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' src={item.image} alt={item.name} />
              <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm ${item.available ? 'bg-green-50 text-green-600' : "bg-slate-100 text-slate-500"}`}>
                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500 animate-pulse' : "bg-slate-400"}`}></span>
                {item.available ? 'Available' : "Offline"}
              </div>
            </div>
            <div className='p-5 flex flex-col gap-1'>
              <p className='text-slate-900 text-lg font-bold group-hover:text-primary transition-colors'>{item.name}</p>
              <p className='text-slate-500 text-sm font-semibold tracking-wide uppercase mb-3'>{item.speciality}</p>
              <div className='pt-3 border-t border-slate-50 flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <input 
                    className='w-4 h-4 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary focus:ring-2 cursor-pointer transition-all'
                    onChange={()=>changeAvailability(item._id)} 
                    type="checkbox" 
                    checked={item.available} 
                  />
                  <p className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Visibility</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList
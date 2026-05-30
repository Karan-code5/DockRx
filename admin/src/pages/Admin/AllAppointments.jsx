import React, { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {

  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl m-6'>

      <p className='mb-6 text-2xl font-bold text-slate-800'>All Appointments Management</p>

      <div className='bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden'>
        <div className='overflow-x-auto max-h-[80vh]'>
          <table className='w-full text-left border-collapse'>
            <thead className='bg-slate-50/50 sticky top-0 z-10'>
              <tr className='text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-slate-100'>
                <th className='px-6 py-4'>#</th>
                <th className='px-6 py-4'>Patient</th>
                <th className='px-6 py-4'>Age</th>
                <th className='px-6 py-4'>Date & Time</th>
                <th className='px-6 py-4'>Doctor</th>
                <th className='px-6 py-4'>Fees</th>
                <th className='px-6 py-4 text-right'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-50'>
              {appointments.map((item, index) => (
                <tr className='hover:bg-slate-50/50 transition-colors group text-sm' key={index}>
                  <td className='px-6 py-4 text-slate-400 font-bold'>{index + 1}</td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <img src={item.userData.image} className='w-9 h-9 rounded-full object-cover border border-slate-100' alt="" /> 
                      <p className='text-slate-800 font-bold'>{item.userData.name}</p>
                    </div>
                  </td>
                  <td className='px-6 py-4 font-semibold text-slate-600'>{calculateAge(item.userData.dob)}</td>
                  <td className='px-6 py-4 font-semibold text-slate-500'>
                    {slotDateFormat(item.slotDate)} <br />
                    <span className='text-xs opacity-70'>{item.slotTime}</span>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <img src={item.docData.image} className='w-9 h-9 rounded-full object-cover bg-slate-100 border border-slate-100' alt="" /> 
                      <p className='text-slate-800 font-bold'>{item.docData.name}</p>
                    </div>
                  </td>
                  <td className='px-6 py-4 font-bold text-slate-900'>{currency}{item.amount}</td>
                  <td className='px-6 py-4 text-right'>
                    {item.cancelled ? (
                      <span className='inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-500 border border-red-100'>Cancelled</span>
                    ) : item.isCompleted ? (
                      <span className='inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-600 border border-green-100'>Completed</span>
                    ) : (
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-red-500 border border-red-100 bg-red-50 hover:bg-red-100 transition-colors'
                      >
                        <img className='w-3.5' src={assets.cancel_icon} alt="" />
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default AllAppointments
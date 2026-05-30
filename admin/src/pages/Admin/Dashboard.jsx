import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const StatCard = ({ icon, value, label, iconBg }) => (
    <div className='stat-card animate-fade-in'>
        <div className={`stat-icon ${iconBg}`}>
            <img className='w-6 h-6' src={icon} alt={label} />
        </div>
        <div>
            <p className='text-2xl font-black text-slate-900'>{value}</p>
            <p className='text-slate-400 text-xs font-bold uppercase tracking-widest mt-0.5'>{label}</p>
        </div>
    </div>
)

const Dashboard = () => {
    const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
    const { slotDateFormat } = useContext(AppContext)

    useEffect(() => {
        if (aToken) getDashData()
    }, [aToken])

    return dashData && (
        <div className='p-6 w-full max-w-7xl animate-fade-in'>

            {/* Page Header */}
            <div className='mb-8'>
                <p className='text-xs font-bold text-primary uppercase tracking-widest mb-1'>Overview</p>
                <h1 className='page-title'>Dashboard</h1>
                <p className='text-slate-400 text-sm font-medium mt-1'>Welcome back — here's what's happening today.</p>
            </div>

            {/* Stats Row */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10'>
                <StatCard icon={assets.doctor_icon}       value={dashData.doctors}       label='Total Doctors'       iconBg='bg-blue-50' />
                <StatCard icon={assets.appointments_icon} value={dashData.appointments}  label='Total Appointments'  iconBg='bg-indigo-50' />
                <StatCard icon={assets.patients_icon}     value={dashData.patients}       label='Total Patients'      iconBg='bg-emerald-50' />
            </div>

            {/* Latest Bookings */}
            <div className='bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden animate-slide-up'>

                {/* Table Header */}
                <div className='flex items-center justify-between px-6 py-5 border-b border-slate-50'>
                    <div className='flex items-center gap-3'>
                        <div className='w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center'>
                            <img className='w-4 h-4' src={assets.list_icon} alt="" />
                        </div>
                        <div>
                            <p className='font-black text-slate-900 text-sm'>Latest Bookings</p>
                            <p className='text-slate-400 text-xs font-medium'>Most recent 5 appointments</p>
                        </div>
                    </div>
                </div>

                <div className='overflow-x-auto'>
                    <table className='data-table'>
                        <thead>
                            <tr>
                                <th>Doctor</th>
                                <th>Booking Date</th>
                                <th className='text-right'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashData.latestAppointments.slice(0, 5).map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className='flex items-center gap-3'>
                                            <img className='w-9 h-9 rounded-xl object-cover border border-slate-100' src={item.docData.image} alt="" />
                                            <div>
                                                <p className='font-bold text-slate-800 text-sm'>{item.docData.name}</p>
                                                <p className='text-slate-400 text-xs'>{item.docData.speciality}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className='text-slate-600 font-semibold'>{slotDateFormat(item.slotDate)}</p>
                                        <p className='text-slate-400 text-xs'>{item.slotTime}</p>
                                    </td>
                                    <td className='text-right'>
                                        {item.cancelled ? (
                                            <span className='badge-danger'>Cancelled</span>
                                        ) : item.isCompleted ? (
                                            <span className='badge-success'>Completed</span>
                                        ) : (
                                            <div className='flex items-center justify-end gap-2'>
                                                <span className='badge-warning'>Pending</span>
                                                <button
                                                    onClick={() => cancelAppointment(item._id)}
                                                    className='inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-red-500 border border-red-100 bg-red-50 hover:bg-red-100 transition-colors'
                                                >
                                                    <img className='w-3' src={assets.cancel_icon} alt="" />
                                                    Cancel
                                                </button>
                                            </div>
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

export default Dashboard
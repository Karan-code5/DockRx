import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const DoctorCard = ({ item, onClick }) => (
    <div 
        onClick={onClick}
        className='bg-white border border-slate-100 rounded-2xl overflow-hidden cursor-pointer 
                   shadow-card hover:shadow-card-hover hover:border-blue-100 hover:-translate-y-1
                   transition-all duration-300 group flex flex-col'
    >
        {/* Image */}
        <div className='aspect-square overflow-hidden bg-gradient-to-b from-blue-50 to-slate-50 relative'>
            <img 
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' 
                src={item.image} 
                alt={item.name} 
            />
            {/* Availability badge */}
            <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-sm border
                ${item.available 
                    ? 'bg-emerald-50/90 text-emerald-700 border-emerald-100' 
                    : 'bg-slate-50/90 text-slate-500 border-slate-100'
                }`}
            >
                <span className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}/>
                {item.available ? 'Available' : 'Offline'}
            </div>
        </div>

        {/* Info */}
        <div className='p-5 flex flex-col gap-1.5 flex-1'>
            <p className='text-slate-900 text-base font-bold group-hover:text-primary transition-colors leading-snug'>
                {item.name}
            </p>
            <p className='text-slate-400 text-xs font-semibold tracking-widest uppercase'>
                {item.speciality}
            </p>
        </div>

        {/* Footer CTA hint */}
        <div className='px-5 pb-4'>
            <div className='text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1'>
                Book Appointment →
            </div>
        </div>
    </div>
)

const TopDoctors = () => {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    return (
        <div className='py-20 text-slate-800'>

            {/* Section Header */}
            <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12'>
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-widest'>
                        <span className='w-8 h-px bg-primary/40'/>
                        Our Specialists
                    </div>
                    <h2 className='text-3xl md:text-4xl font-black tracking-tight text-slate-900'>Top Doctors to Book</h2>
                    <p className='text-slate-500 font-medium text-base'>
                        Handpicked specialists ready to serve you.
                    </p>
                </div>
                <button 
                    onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} 
                    className='btn-ghost self-start sm:self-auto flex-shrink-0 text-sm'
                >
                    View All →
                </button>
            </div>

            {/* Doctor Grid */}
            <div className='w-full grid grid-cols-auto gap-5 stagger-children'>
                {doctors.slice(0, 10).map((item, index) => (
                    <DoctorCard
                        key={index}
                        item={item}
                        onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
                    />
                ))}
            </div>
        </div>
    )
}

export default TopDoctors
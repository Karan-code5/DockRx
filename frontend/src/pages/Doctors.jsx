import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const specialities = ['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist']

const Doctors = () => {
    const { speciality } = useParams()
    const [filterDoc, setFilterDoc] = useState([])
    const [showFilter, setShowFilter] = useState(false)
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    useEffect(() => {
        setFilterDoc(speciality ? doctors.filter(doc => doc.speciality === speciality) : doctors)
    }, [doctors, speciality])

    return (
        <div className='py-8 animate-fade-in'>

            {/* Page Header */}
            <div className='mb-8'>
                <p className='text-xs font-bold text-primary uppercase tracking-widest mb-2'>Find a Doctor</p>
                <h1 className='text-2xl md:text-3xl font-black text-slate-900 tracking-tight'>Browse Specialists</h1>
                <p className='text-slate-500 font-medium mt-1'>
                    {filterDoc.length} doctor{filterDoc.length !== 1 ? 's' : ''} available
                    {speciality ? ` · ${speciality}` : ''}
                </p>
            </div>

            <div className='flex flex-col sm:flex-row items-start gap-8'>

                {/* Mobile filter toggle */}
                <button 
                    onClick={() => setShowFilter(!showFilter)} 
                    className={`sm:hidden px-5 py-2.5 rounded-xl text-sm font-bold border-2 transition-all shadow-sm
                        ${showFilter ? 'bg-primary text-white border-primary' : 'bg-white text-slate-700 border-slate-200'}`}
                >
                    {showFilter ? '✕ Hide Filters' : '⊞ Show Filters'}
                </button>

                {/* Sidebar Filters */}
                <div className={`${showFilter ? 'flex' : 'hidden sm:flex'} flex-col gap-2 w-full sm:w-56 flex-shrink-0`}>
                    <p className='text-xs font-black uppercase tracking-widest text-slate-400 px-1 mb-2'>Speciality</p>
                    {specialities.map(spec => (
                        <button
                            key={spec}
                            onClick={() => { 
                                navigate(speciality === spec ? '/doctors' : `/doctors/${spec}`)
                                setShowFilter(false)
                            }}
                            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200
                                ${speciality === spec 
                                    ? 'bg-primary-light text-primary border-primary/30 shadow-sm' 
                                    : 'text-slate-600 border-transparent hover:bg-white hover:border-slate-200 hover:shadow-card'}`}
                        >
                            {spec}
                        </button>
                    ))}

                    {speciality && (
                        <button
                            onClick={() => navigate('/doctors')}
                            className='w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-red-500 transition-colors mt-2'
                        >
                            ✕ Clear filter
                        </button>
                    )}
                </div>

                {/* Doctor Grid */}
                <div className='w-full'>
                    {filterDoc.length > 0 ? (
                        <div className='grid grid-cols-auto gap-5 stagger-children'>
                            {filterDoc.map((item, index) => (
                                <div 
                                    key={index}
                                    onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                                    className='bg-white border border-slate-100 rounded-2xl overflow-hidden cursor-pointer 
                                               shadow-card hover:shadow-card-hover hover:border-blue-100 hover:-translate-y-1
                                               transition-all duration-300 group flex flex-col animate-fade-in'
                                >
                                    <div className='aspect-square overflow-hidden bg-gradient-to-b from-blue-50 to-slate-50 relative'>
                                        <img 
                                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' 
                                            src={item.image} 
                                            alt={item.name} 
                                        />
                                        <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-sm border
                                            ${item.available 
                                                ? 'bg-emerald-50/90 text-emerald-700 border-emerald-100' 
                                                : 'bg-slate-50/90 text-slate-500 border-slate-100'}`}
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}/>
                                            {item.available ? 'Available' : 'Offline'}
                                        </div>
                                    </div>
                                    <div className='p-4 flex flex-col gap-1 flex-1'>
                                        <p className='text-slate-900 text-sm font-bold group-hover:text-primary transition-colors'>{item.name}</p>
                                        <p className='text-slate-400 text-xs font-semibold tracking-wider uppercase'>{item.speciality}</p>
                                    </div>
                                    <div className='px-4 pb-3'>
                                        <span className='text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity'>Book →</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='flex flex-col items-center justify-center py-20 text-center'>
                            <div className='w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4 text-2xl'>🔍</div>
                            <p className='text-slate-600 font-bold mb-1'>No doctors found</p>
                            <p className='text-slate-400 text-sm'>Try clearing the filter or check back later.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Doctors
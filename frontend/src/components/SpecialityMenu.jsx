import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div id='speciality' className='py-20 text-slate-800'>

            {/* Section Header */}
            <div className='flex flex-col items-center text-center gap-4 mb-14'>
                <div className='flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-widest'>
                    <span className='w-8 h-px bg-primary/40'/>
                    Specialities
                    <span className='w-8 h-px bg-primary/40'/>
                </div>
                <h2 className='text-3xl md:text-4xl font-black tracking-tight text-slate-900'>Find by Speciality</h2>
                <p className='text-slate-500 font-medium max-w-md text-base leading-relaxed'>
                    Browse our extensive list of trusted doctors and schedule your appointment hassle-free.
                </p>
            </div>

            {/* Speciality Cards */}
            <div className='flex sm:justify-center gap-5 w-full overflow-x-auto pb-4 px-2 no-scrollbar stagger-children'>
                {specialityData.map((item, index) => (
                    <Link 
                        to={`/doctors/${item.speciality}`} 
                        onClick={() => scrollTo(0, 0)} 
                        className='flex flex-col items-center gap-3 flex-shrink-0 group animate-fade-in' 
                        key={index}
                    >
                        <div className='w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center shadow-card group-hover:shadow-card-hover group-hover:border-primary/20 group-hover:bg-primary-light transition-all duration-300'>
                            <img 
                                className='w-11 sm:w-16 group-hover:scale-110 transition-transform duration-300' 
                                src={item.image} 
                                alt={item.speciality} 
                            />
                        </div>
                        <p className='text-xs sm:text-sm font-bold text-slate-600 group-hover:text-primary transition-colors text-center max-w-[90px]'>
                            {item.speciality}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu
import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='relative flex flex-col md:flex-row bg-gradient-to-br from-blue-700 via-primary to-blue-500 rounded-3xl overflow-hidden shadow-2xl'>

            {/* Decorative blobs */}
            <div className='absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none'/>
            <div className='absolute bottom-0 left-1/3 w-64 h-64 bg-blue-400/10 rounded-full translate-y-1/2 blur-2xl pointer-events-none'/>

            {/* --------- Header Left --------- */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-7 py-14 px-8 md:px-14 lg:px-20 m-auto md:py-[10vw] md:mb-[-30px] relative z-10 animate-fade-in'>

                <div className='flex flex-col gap-3'>
                    <div className='flex items-center gap-2 text-blue-200 text-sm font-semibold uppercase tracking-widest mb-1'>
                        <span className='w-6 h-px bg-blue-200'/>
                        Trusted Healthcare Platform
                    </div>
                    <p className='text-3xl md:text-5xl lg:text-[3.5rem] text-white font-black leading-[1.15] tracking-tight'>
                        Book Appointment<br />
                        <span className='text-blue-200'>With Trusted</span> Doctors
                    </p>
                </div>

                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 text-white/80 text-sm font-medium'>
                    <img className='w-20 border-2 border-white/30 rounded-full shadow-lg' src={assets.group_profiles} alt="" />
                    <p className='leading-relaxed'>
                        Simply browse through our extensive list<br className='hidden sm:block' />
                        of trusted doctors, schedule hassle-free.
                    </p>
                </div>

                <div className='flex flex-col sm:flex-row gap-3 mt-2'>
                    <a 
                        href='#speciality' 
                        className='flex items-center gap-3 bg-white text-primary font-bold text-sm px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-300 active:scale-95 group'
                    >
                        Book Appointment 
                        <img className='w-3 group-hover:translate-x-1 transition-transform' src={assets.arrow_icon} alt="" />
                    </a>
                    <a 
                        href='/doctors' 
                        className='flex items-center gap-2 text-white/90 font-semibold text-sm px-6 py-4 rounded-xl border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-300'
                    >
                        Browse All Doctors
                    </a>
                </div>

                {/* Stats strip */}
                <div className='flex gap-8 mt-2 pt-6 border-t border-white/15 w-full'>
                    {[['100+', 'Doctors'], ['50k+', 'Patients'], ['4.9★', 'Rating']].map(([val, label]) => (
                        <div key={label} className='flex flex-col'>
                            <span className='text-white font-black text-xl'>{val}</span>
                            <span className='text-blue-200 text-xs font-semibold'>{label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* --------- Header Right --------- */}
            <div className='md:w-1/2 relative min-h-[280px] md:min-h-[420px]'>
                <img 
                    className='w-full md:absolute bottom-0 right-0 h-auto object-contain animate-slide-up' 
                    src={assets.header_img} 
                    alt="Doctors" 
                />
            </div>
        </div>
    )
}

export default Header
import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate()

    return (
        <div className='relative flex overflow-hidden rounded-3xl my-24 md:mx-0 shadow-2xl bg-gradient-to-br from-blue-800 via-primary to-blue-500'>

            {/* Decorative elements */}
            <div className='absolute inset-0 pointer-events-none overflow-hidden'>
                <div className='absolute -top-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl'/>
                <div className='absolute -bottom-20 left-1/2 w-80 h-80 bg-blue-400/10 rounded-full blur-2xl'/>
                <div className='absolute top-1/2 right-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl'/>
            </div>

            {/* Left Side */}
            <div className='flex-1 py-14 sm:py-20 lg:py-28 px-8 sm:px-12 lg:px-20 z-10 relative'>
                
                <div className='inline-flex items-center gap-2 text-blue-200 text-xs font-bold uppercase tracking-widest mb-6 bg-white/10 px-3 py-1.5 rounded-full border border-white/20'>
                    <span className='w-1.5 h-1.5 rounded-full bg-blue-300 animate-pulse'/>
                    Start Today — It's Free
                </div>

                <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.15] tracking-tight mb-3'>
                    Book Appointment<br />
                    <span className='text-blue-200 font-medium text-xl sm:text-2xl lg:text-3xl'>With 100+ Trusted Doctors</span>
                </h2>

                <p className='text-white/70 font-medium text-sm sm:text-base max-w-sm mt-4 mb-8 leading-relaxed'>
                    Join thousands of patients who manage their healthcare effortlessly with DockRx.
                </p>

                <div className='flex flex-col sm:flex-row gap-3'>
                    <button 
                        onClick={() => { navigate('/login'); scrollTo(0, 0) }} 
                        className='flex items-center justify-center gap-2 bg-white text-primary font-bold text-sm px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-300 active:scale-95'
                    >
                        Create Free Account →
                    </button>
                    <button 
                        onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} 
                        className='flex items-center justify-center gap-2 text-white/90 font-semibold text-sm px-8 py-4 rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-300'
                    >
                        Browse Doctors
                    </button>
                </div>

                {/* Trust indicators */}
                <div className='flex gap-6 mt-10 pt-6 border-t border-white/15'>
                    {[['✓', 'No booking fees'], ['✓', 'Cancel anytime'], ['✓', '24/7 support']].map(([icon, label]) => (
                        <span key={label} className='text-white/60 text-xs font-semibold flex items-center gap-1'>
                            <span className='text-blue-300'>{icon}</span> {label}
                        </span>
                    ))}
                </div>
            </div>

            {/* Right Side */}
            <div className='hidden md:flex md:w-[40%] lg:w-[35%] relative z-0 items-end justify-end'>
                <img 
                    className='w-full max-w-xs lg:max-w-sm object-contain absolute bottom-0 right-0' 
                    src={assets.appointment_img} 
                    alt="Appointment" 
                />
            </div>
        </div>
    )
}

export default Banner
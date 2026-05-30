import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='py-10'>

      <div className='text-center text-3xl font-bold text-slate-800 pb-12'>
        <p>CONTACT <span className='text-primary'>US</span></p>
        <div className='h-1.5 w-20 bg-primary rounded-full mx-auto mt-4'></div>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-16 mb-28 items-center'>
        <div className='w-full md:max-w-[400px] rounded-2xl overflow-hidden shadow-xl'>
          <img className='w-full object-cover' src={assets.contact_image} alt="Contact Office" />
        </div>
        <div className='flex flex-col justify-center items-start gap-8 max-w-md'>
          <div>
            <p className='font-bold text-xl text-slate-800 mb-4 tracking-tight uppercase'>Our Medical Center</p>
            <p className='text-slate-500 font-medium leading-relaxed'>54709 Willms Station <br /> Suite 350, Washington, USA</p>
          </div>
          
          <div>
            <p className='text-slate-500 font-medium'>Tel: <span className='text-slate-800 font-bold'>(415) 555-0132</span></p>
            <p className='text-slate-500 font-medium'>Email: <span className='text-slate-800 font-bold'>greatstackdev@gmail.com</span></p>
          </div>

          <div className='bg-slate-50 p-8 rounded-2xl border border-slate-100'>
            <p className='font-bold text-xl text-slate-800 mb-3 tracking-tight uppercase'>Careers at DockRx</p>
            <p className='text-slate-500 font-medium mb-6'>Learn more about our teams and current medical job openings.</p>
            <button className='bg-white border-2 border-primary text-primary px-10 py-4 text-sm font-bold rounded-xl hover:bg-primary hover:text-white transition-all duration-300 active:scale-95 shadow-sm'>Explore Opportunities</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Contact

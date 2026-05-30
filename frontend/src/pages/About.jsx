import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='py-10'>

      <div className='text-center text-3xl font-bold text-slate-800 pb-12'>
        <p>ABOUT <span className='text-primary'>DOCKRX</span></p>
        <div className='h-1.5 w-20 bg-primary rounded-full mx-auto mt-4'></div>
      </div>

      <div className='my-10 flex flex-col lg:flex-row gap-16 items-center'>
        <div className='w-full lg:max-w-[400px] rounded-2xl overflow-hidden shadow-xl'>
          <img className='w-full object-cover' src={assets.about_image} alt="About DockRx" />
        </div>
        <div className='flex flex-col justify-center gap-8 lg:w-3/5 text-slate-600 font-medium leading-relaxed'>
          <p className='text-lg'>Welcome to <span className='text-primary font-bold'>DockRx</span>, your trusted partner in managing your healthcare needs conveniently and efficiently. At DockRx, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p>DockRx is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, DockRx is here to support you every step of the way.</p>
          <div className='bg-blue-50 p-8 rounded-2xl border-l-8 border-primary'>
            <b className='text-slate-800 text-xl block mb-2'>Our Vision</b>
            <p>Our vision at DockRx is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
          </div>
        </div>
      </div>

      <div className='text-2xl font-bold text-slate-800 mt-20 mb-10'>
        <p>WHY <span className='text-primary'>CHOOSE US</span></p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-100 rounded-3xl overflow-hidden mb-20 shadow-sm'>
        <div className='bg-white px-10 py-16 flex flex-col gap-4 text-slate-600 hover:bg-primary hover:text-white transition-all duration-500 cursor-pointer border-r border-slate-100 last:border-0'>
          <b className='text-lg font-bold'>EFFICIENCY</b>
          <p className='font-medium opacity-80'>Streamlined appointment scheduling that fits into your busy lifestyle seamlessly.</p>
        </div>
        <div className='bg-white px-10 py-16 flex flex-col gap-4 text-slate-600 hover:bg-primary hover:text-white transition-all duration-500 cursor-pointer border-r border-slate-100 last:border-0'>
          <b className='text-lg font-bold'>CONVENIENCE</b>
          <p className='font-medium opacity-80'>Access to a wide network of trusted healthcare professionals right at your fingertips.</p>
        </div>
        <div className='bg-white px-10 py-16 flex flex-col gap-4 text-slate-600 hover:bg-primary hover:text-white transition-all duration-500 cursor-pointer'>
          <b className='text-lg font-bold'>PERSONALIZATION</b>
          <p className='font-medium opacity-80'>Tailored recommendations and reminders to help you stay proactive about your health.</p>
        </div>
      </div>

    </div>
  )
}

export default About

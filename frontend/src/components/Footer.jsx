import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='mt-24 border-t border-slate-100'>

            <div className='grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-12 py-16'>

                {/* Brand Column */}
                <div className='flex flex-col gap-5'>
                    <img className='w-36' src={assets.logo} alt="DockRx" />
                    <p className='text-slate-500 text-sm leading-relaxed max-w-sm font-medium'>
                        DockRx makes healthcare accessible by connecting patients with trusted specialists. 
                        Book appointments, manage your health, and get the care you deserve.
                    </p>
                    <div className='flex gap-3 mt-1'>
                        {['Twitter', 'LinkedIn', 'Instagram'].map(social => (
                            <div key={social} className='w-9 h-9 rounded-xl bg-slate-100 hover:bg-primary-light hover:text-primary flex items-center justify-center text-slate-500 text-xs font-bold cursor-pointer transition-all border border-slate-200 hover:border-primary/20'>
                                {social[0]}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Company Column */}
                <div className='flex flex-col gap-4'>
                    <p className='text-xs font-black uppercase tracking-widest text-slate-900 mb-2'>Company</p>
                    <ul className='flex flex-col gap-3'>
                        {[['Home', '/'], ['About Us', '/about'], ['Contact', '/contact'], ['Privacy Policy', '/']].map(([label, href]) => (
                            <li key={label}>
                                <Link to={href} className='text-slate-500 text-sm font-medium hover:text-primary transition-colors'>
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Column */}
                <div className='flex flex-col gap-4'>
                    <p className='text-xs font-black uppercase tracking-widest text-slate-900 mb-2'>Get In Touch</p>
                    <ul className='flex flex-col gap-3'>
                        <li className='text-slate-500 text-sm font-medium'>+1-212-456-7890</li>
                        <li className='text-slate-500 text-sm font-medium'>support@dockrx.com</li>
                        <li className='text-slate-400 text-xs'>54709 Willms Station, Suite 350<br/>Washington, USA</li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className='divider-gradient'/>
            <div className='flex flex-col sm:flex-row items-center justify-between gap-3 py-6 text-slate-400 text-xs font-medium'>
                <p>Copyright © 2024 DockRx | Built by karan-code5 - All Rights Reserved.</p>
                <div className='flex gap-5'>
                    <span className='hover:text-slate-600 cursor-pointer transition-colors'>Privacy</span>
                    <span className='hover:text-slate-600 cursor-pointer transition-colors'>Terms</span>
                    <span className='hover:text-slate-600 cursor-pointer transition-colors'>Cookies</span>
                </div>
            </div>

        </footer>
    )
}

export default Footer

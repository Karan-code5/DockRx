import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { backendUrl, aToken } = useContext(AdminContext)
    const { currency } = useContext(AppContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {

            if (!docImg) {
                return toast.error('Image Not Selected')
            }

            const formData = new FormData();

            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { atoken: aToken } })
            
            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
            console.error("Add Doctor Error:", error)
        }

    }

    return (
        <form onSubmit={onSubmitHandler} className='m-6 w-full max-w-6xl'>

            <p className='mb-6 text-2xl font-bold text-slate-800'>Register New Doctor — DockRx</p>

            <div className='bg-white px-8 py-10 border border-slate-100 rounded-2xl shadow-sm w-full'>
                <div className='flex items-center gap-6 mb-10 text-slate-500 group'>
                    <label htmlFor="doc-img" className='relative cursor-pointer'>
                        <div className='w-24 h-24 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden group-hover:border-primary transition-all'>
                            <img className='w-full h-full object-cover' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
                        </div>
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
                    <div>
                        <p className='text-slate-800 font-bold'>Doctor Portrait</p>
                        <p className='text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1'>Click to upload (PNG, JPG)</p>
                    </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6 text-slate-600'>

                    {/* Left Column */}
                    <div className='flex flex-col gap-6'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-xs font-bold uppercase tracking-widest text-slate-400'>Full Name</p>
                            <input onChange={e => setName(e.target.value)} value={name} className='border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-800' type="text" placeholder='Dr. John Doe' required />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-xs font-bold uppercase tracking-widest text-slate-400'>Professional Email</p>
                            <input onChange={e => setEmail(e.target.value)} value={email} className='border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-800' type="email" placeholder='doctor@example.com' required />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-xs font-bold uppercase tracking-widest text-slate-400'>Access Password</p>
                            <input onChange={e => setPassword(e.target.value)} value={password} className='border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-800' type="password" placeholder='••••••••' required />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-xs font-bold uppercase tracking-widest text-slate-400'>Years of Experience</p>
                            <select onChange={e => setExperience(e.target.value)} value={experience} className='border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-800 bg-white' >
                                {[1,2,3,4,5,6,8,9,10].map(yr => (
                                    <option key={yr} value={`${yr} Year${yr > 1 ? 's' : ''}`}>{yr} Year{yr > 1 ? 's' : ''}</option>
                                ))}
                            </select>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-xs font-bold uppercase tracking-widest text-slate-400'>Consultation Fee</p>
                            <div className='relative'>
                                <span className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm select-none'>{currency}</span>
                                <input onChange={e => setFees(e.target.value)} value={fees} className='border border-slate-200 rounded-xl pl-8 pr-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-800 w-full' type="number" placeholder='0' required />
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className='flex flex-col gap-6'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-xs font-bold uppercase tracking-widest text-slate-400'>Speciality</p>
                            <select onChange={e => setSpeciality(e.target.value)} value={speciality} className='border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-800 bg-white'>
                                {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map(spec => (
                                    <option key={spec} value={spec}>{spec}</option>
                                ))}
                            </select>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-xs font-bold uppercase tracking-widest text-slate-400'>Education / Degree</p>
                            <input onChange={e => setDegree(e.target.value)} value={degree} className='border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-800' type="text" placeholder='MBBS, MD' required />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='text-xs font-bold uppercase tracking-widest text-slate-400'>Clinic Address</p>
                            <div className='flex flex-col gap-3'>
                                <input onChange={e => setAddress1(e.target.value)} value={address1} className='border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-800' type="text" placeholder='Address line 1' required />
                                <input onChange={e => setAddress2(e.target.value)} value={address2} className='border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-800' type="text" placeholder='Address line 2' required />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-8'>
                    <p className='text-xs font-bold uppercase tracking-widest text-slate-400 mb-2'>Professional Biography</p>
                    <textarea onChange={e => setAbout(e.target.value)} value={about} className='w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-primary focus:ring-4 focus:ring-blue-50 transition-all font-medium text-slate-800' rows={4} placeholder='Write a brief description about the doctor...'></textarea>
                </div>

                <div className='mt-10 pt-8 border-t border-slate-50'>
                    <button type='submit' className='bg-primary text-white px-12 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95'>Create Doctor Profile</button>
                </div>

            </div>
        </form>
    )
}

export default AddDoctor
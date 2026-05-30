import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)

    const [image, setImage] = useState(false)

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    // Function to update user profile data using API
    const updateUserProfileData = async () => {

        try {

            const formData = new FormData();

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    return userData ? (
        <div className='max-w-2xl flex flex-col gap-8 text-sm py-10'>
            <div className='bg-white p-8 rounded-2xl border border-slate-100 shadow-sm'>
                <div className='flex flex-col gap-6'>
                    {isEdit ? (
                        <label htmlFor='image' className='relative cursor-pointer group w-fit'>
                            <div className='w-36 h-36 rounded-2xl overflow-hidden border-2 border-slate-200 group-hover:border-primary transition-all relative'>
                                <img className='w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-all' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                                <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all'>
                                    <img className='w-10' src={assets.upload_icon} alt="" />
                                </div>
                            </div>
                            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                        </label>
                    ) : (
                        <div className='w-36 h-36 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-sm'>
                            <img className='w-full h-full object-cover' src={userData.image} alt="" />
                        </div>
                    )}

                    <div className='flex flex-col gap-2'>
                        {isEdit ? (
                            <input 
                                className='bg-slate-50 text-3xl font-bold px-4 py-2 rounded-xl border border-slate-200 outline-none focus:border-primary transition-all w-full max-w-md' 
                                type="text" 
                                onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} 
                                value={userData.name} 
                            />
                        ) : (
                            <p className='font-bold text-4xl text-slate-800'>{userData.name}</p>
                        )}
                        <div className='h-1 w-20 bg-primary rounded-full'></div>
                    </div>
                </div>

                <div className='mt-10'>
                    <p className='text-slate-400 font-bold text-xs uppercase tracking-widest border-b border-slate-50 pb-2 mb-6'>Contact Information</p>
                    <div className='grid grid-cols-[1fr_3fr] gap-y-6 text-slate-700'>
                        <p className='font-bold text-slate-500'>Email Address</p>
                        <p className='text-primary font-semibold'>{userData.email}</p>
                        
                        <p className='font-bold text-slate-500'>Phone Number</p>
                        {isEdit ? (
                            <input 
                                className='bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 outline-none focus:border-primary max-w-xs' 
                                type="text" 
                                onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} 
                                value={userData.phone} 
                            />
                        ) : (
                            <p className='text-primary font-semibold'>{userData.phone}</p>
                        )}

                        <p className='font-bold text-slate-500'>Home Address</p>
                        {isEdit ? (
                            <div className='flex flex-col gap-2 max-w-xs'>
                                <input className='bg-slate-50 px-4 py-2 rounded-lg border border-slate-200' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} />
                                <input className='bg-slate-50 px-4 py-2 rounded-lg border border-slate-200' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} />
                            </div>
                        ) : (
                            <p className='text-slate-600 font-medium leading-relaxed'>{userData.address.line1}<br />{userData.address.line2}</p>
                        )}
                    </div>
                </div>

                <div className='mt-10'>
                    <p className='text-slate-400 font-bold text-xs uppercase tracking-widest border-b border-slate-50 pb-2 mb-6'>Basic Information</p>
                    <div className='grid grid-cols-[1fr_3fr] gap-y-6 text-slate-700'>
                        <p className='font-bold text-slate-500'>Gender</p>
                        {isEdit ? (
                            <select 
                                className='bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 outline-none focus:border-primary max-w-xs' 
                                onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} 
                                value={userData.gender}
                            >
                                <option value="Not Selected">Not Selected</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        ) : (
                            <p className='text-slate-600 font-semibold'>{userData.gender}</p>
                        )}

                        <p className='font-bold text-slate-500'>Birthday</p>
                        {isEdit ? (
                            <input 
                                className='bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 max-w-xs' 
                                type='date' 
                                onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} 
                                value={userData.dob} 
                            />
                        ) : (
                            <p className='text-slate-600 font-semibold'>{userData.dob}</p>
                        )}
                    </div>
                </div>

                <div className='mt-12 pt-8 border-t border-slate-100'>
                    {isEdit ? (
                        <button 
                            onClick={updateUserProfileData} 
                            className='bg-primary text-white px-10 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95'
                        >
                            Save Profile Changes
                        </button>
                    ) : (
                        <button 
                            onClick={() => setIsEdit(true)} 
                            className='border-2 border-primary text-primary px-10 py-3 rounded-xl font-bold hover:bg-primary hover:text-white transition-all active:scale-95'
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    ) : null
}

export default MyProfile
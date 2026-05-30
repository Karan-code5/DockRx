import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
const RelatedDoctors = ({ speciality, docId }) => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        }
    }, [doctors, speciality, docId])

    return (
        <div className='flex flex-col items-center gap-6 my-16 text-slate-800'>
            <h1 className='text-3xl md:text-4xl font-bold tracking-tight'>Related Doctors</h1>
            <p className='sm:w-1/2 text-center text-slate-500 font-medium'>Explore other trusted doctors in this speciality.</p>
            <div className='w-full grid grid-cols-auto gap-6 pt-8 gap-y-10 px-3 sm:px-0'>
                {relDoc.map((item, index) => (
                    <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='bg-white border border-slate-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:border-primary/30 transition-all duration-300 group flex flex-col' key={index}>
                        <div className='aspect-square overflow-hidden bg-slate-50 relative'>
                            <img className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' src={item.image} alt={item.name} />
                            <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm ${item.available ? 'bg-green-50 text-green-600' : "bg-slate-100 text-slate-500"}`}>
                                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500 animate-pulse' : "bg-slate-400"}`}></span>
                                {item.available ? 'Available' : "Offline"}
                            </div>
                        </div>
                        <div className='p-5 flex flex-col gap-1'>
                            <p className='text-slate-900 text-lg font-bold group-hover:text-primary transition-colors'>{item.name}</p>
                            <p className='text-slate-500 text-sm font-semibold tracking-wide uppercase'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RelatedDoctors